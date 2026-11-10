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

/** Split a text into stanzas on blank lines. */
export const stanzas = (text = '') =>
  text
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean);
