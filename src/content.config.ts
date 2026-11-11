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
    decade: z.string().optional(), // e.g. "1980s"; use when the exact year is unknown
    themes: z.array(z.string()).default([]),
    somali: z.string(), // stanzas separated by a blank line
    english: z.string().optional(), // same stanza breaks as the Somali
    translator: z.string().optional(),
    source: z.string().optional(),
    summary: z.string().optional(), // one or two plain sentences on what the piece says
    // Words a reader can tap in the Somali text. `forms` lists the exact
    // spellings used in the text when they differ from `word`.
    glossary: z
      .array(
        z.object({
          word: z.string(),
          forms: z.array(z.string()).optional(),
          say: z.string().optional(), // rough pronunciation for English speakers
          meaning: z.string(),
        }),
      )
      .default([]),
    // YouTube links, shown as a player above the text
    videos: z.array(z.object({ url: z.string().url(), label: z.string().optional() })).default([]),
    // References, listed at the foot of the page
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url(), note: z.string().optional() }))
      .default([]),
  }),
});

export const collections = { songs };
