import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per entry in src/content/songs/.
// Frontmatter holds the metadata and both texts; the Markdown body is the notes.
const songs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/songs' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    poet: z.string(),
    singer: z.string().optional(), // omit for poems that were never sung
    genre: z.string(), // e.g. Hees, Gabay, Buraanbur, Geeraar, Jiifto
    year: z.number().int().optional(), // decade is derived from this
    themes: z.array(z.string()).default([]),
    somali: z.string(), // stanzas separated by a blank line
    english: z.string().optional(), // same stanza breaks as the Somali
    translator: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const collections = { songs };
