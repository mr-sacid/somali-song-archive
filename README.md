# Somali Song & Poetry Archive

An Astro site. Each entry is one Markdown file in `src/content/songs/`.

## Run locally

```bash
npm install
npm run dev
```

## Add an entry

Create `src/content/songs/my-song.md`. The file name becomes the URL (`/songs/my-song/`).

```markdown
---
title: Somali title            # required
title_en: English title
poet: Name of poet             # required
singer: Name of singer         # leave out for poems that were never sung
genre: Hees                    # required: Hees, Gabay, Buraanbur, Geeraar, Jiifto...
year: 1974                     # the decade filter is worked out from this
themes: [Love, Homeland]
translator: Name
source: Where the text came from
somali: |
  First stanza, line one
  First stanza, line two

  Second stanza
english: |
  First stanza, line one
  First stanza, line two

  Second stanza
---

Notes go here, in ordinary Markdown.
```

Stanzas are separated by a blank line. Keep the same stanza breaks in `somali` and `english` so they line up side by side.

The schema lives in `src/content.config.ts`. The build fails with a clear message if a required field is missing.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository, on the `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` builds and publishes the site at `https://<user>.github.io/<repo>/`.

The base path is worked out from the repository name in `astro.config.mjs`. For a custom domain, set `site` to the domain and `base` to `/` there.
