import { defineConfig } from 'astro/config';

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo". We derive the Pages
// URL from it so the site works at https://owner.github.io/repo/ with no
// manual config. Locally, the site is served from "/".
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : undefined,
  base: owner && !isUserSite ? `/${repo}` : '/',
});
