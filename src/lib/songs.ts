import { getCollection, type CollectionEntry } from 'astro:content';

export type Song = CollectionEntry<'songs'>;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the site's base (needed on GitHub Pages). */
export const link = (path: string) => `${base}${path}`;

export const decadeOf = (d: { year?: number; decade?: string }) =>
  d.year ? `${Math.floor(d.year / 10) * 10}s` : (d.decade ?? 'Unknown');

export async function getSongs(): Promise<Song[]> {
  const songs = await getCollection('songs');
  return songs.sort((a, b) => a.data.title.localeCompare(b.data.title, 'so'));
}

/** Sorted unique values, dropping empties. */
export const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((v): v is string => Boolean(v)))].sort((a, b) =>
    a.localeCompare(b),
  );

/** Pull the video id out of any common YouTube link. */
export const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/)?.[1];

/** A picture for a song: the thumbnail of its first recording, if it has one. */
export const thumb = (song: Song) => {
  const id = song.data.videos.map((v) => youtubeId(v.url)).find(Boolean);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
};

export type Gloss = Song['data']['glossary'][number];
export type Segment = string | { text: string; gloss: Gloss };

/** Split a line of verse into plain text and glossary words. */
export function annotate(line: string, glossary: Gloss[]): Segment[] {
  const forms = glossary
    .flatMap((gloss) => (gloss.forms ?? [gloss.word]).map((f) => ({ form: f.toLowerCase(), gloss })))
    .sort((a, b) => b.form.length - a.form.length);
  if (forms.length === 0) return [line];

  const escaped = forms.map((f) => f.form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(?<![\\p{L}’'])(${escaped.join('|')})(?![\\p{L}’'])`, 'giu');
  const out: Segment[] = [];
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    const at = match.index ?? 0;
    if (at > last) out.push(line.slice(last, at));
    out.push({ text: match[0], gloss: forms.find((f) => f.form === match[0].toLowerCase())!.gloss });
    last = at + match[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/** Split a text into stanzas on blank lines. */
export const stanzas = (text = '') =>
  text
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean);
