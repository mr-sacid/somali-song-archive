import { getCollection, type CollectionEntry } from 'astro:content';

export type Song = CollectionEntry<'songs'>;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the site's base (needed on GitHub Pages). */
export const link = (path: string) => `${base}${path}`;

export const decadeOf = (year?: number) =>
  year ? `${Math.floor(year / 10) * 10}s` : 'Unknown';

export async function getSongs(): Promise<Song[]> {
  const songs = await getCollection('songs');
  return songs.sort((a, b) => a.data.title.localeCompare(b.data.title, 'so'));
}

/** Sorted unique values, dropping empties. */
export const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((v): v is string => Boolean(v)))].sort((a, b) =>
    a.localeCompare(b),
  );

/** Split a text into stanzas on blank lines. */
export const stanzas = (text = '') =>
  text
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean);
