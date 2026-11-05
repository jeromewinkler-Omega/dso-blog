## Changes in the branch `feature/projekt-dokumentation`

All adjustments were implemented on the feature branch `feature/projekt-dokumentation`
and merged into `main` via pull request #1 (`setup-blog`).
Every merge into `main` automatically builds the site and deploys it to GitHub Pages.

**Live site:** https://jeromewinkler-omega.github.io/dso-blog/

### 1. Security: env files excluded

**File:** `.gitignore`

All environment files are excluded from the repository. Only the template `example.env` is allowed.

```ignore
.env
.env.*
*.env
!example.env
```

**File:** `example.env`

Shows which variables are needed. The CI/CD workflow copies this file to `.env` before the build,
so the values here are used for the live site:

```.env
BLOG_ENABLED=false
DEPLOYMENT_URL=https://jeromewinkler-omega.github.io
BASE_URL=/dso-blog/
GITHUB_ORG=jeromewinkler-Omega
GITHUB_PROJECT=dso-blog
```

For the local development, a separate `.env` is created from (`Copy-Item example.env .env`), which does not enter the repository.

### 2. Bug fix: webpack compatibility and Docusaurus update

**Files:** `package.json`, `package-lock.json`, `.github/workflows/deploy.yaml`

**Problem:** The server did not start:

```
Cannot find module 'webpack/lib/ContextReplacementPlugin'
```

**Cause:** `@docusaurus/theme-classic` 3.5.2 loads this plugin directly from its file path.
In newer webpack versions (5.112.x) the file was moved to `lib/context/ContextReplacementPlugin.js`,
so the old path no longer exists.

**Temporary fix:** webpack was pinned to 5.95.0, the last version with the old file path.

**Final solution:** Docusaurus updated to 3.10.x. From this version on, Docusaurus uses the
official webpack API instead of the file path, so the webpack pin was removed again.
All `@docusaurus/*` packages use the same version range:

```json
"dependencies": {
  "@docusaurus/core": "^3.10.2",
  "@docusaurus/preset-classic": "^3.10.2"
},
"devDependencies": {
  "@docusaurus/module-type-aliases": "^3.10.2",
  "@docusaurus/tsconfig": "^3.10.2",
  "@docusaurus/types": "^3.10.2"
},
"engines": {
  "node": ">=20.0"
}
```

- `^3.10.2` allows compatible updates within 3.x; the exact versions are locked in `package-lock.json`
- Docusaurus 3.10 requires Node.js 20 or newer, so the CI workflow (`deploy.yaml`) now uses `node-version: 22`
```

### 3. Site configuration changed to own repository

**File:** `docusaurus.config.ts`

- Title and tagline adapted to the own project
- Fallback values for the GitHub Pages deployment if no `.env` is present:

```typescript
url: process.env.DEPLOYMENT_URL ?? 'https://jeromewinkler-omega.github.io',
baseUrl: process.env.BASE_URL ?? '/dso-blog/',
organizationName: process.env.GITHUB_ORG ?? 'jeromewinkler-Omega',
projectName: process.env.GITHUB_PROJECT ?? 'dso-blog',
```

- The repository URL is read from the environment with a fallback and used for the "edit this page" links:

```typescript
const gitRepositoryUrl = process.env.GIT_REPOSITORY_URL ?? 'https://github.com/jeromewinkler-Omega/dso-blog';

editUrl: `${gitRepositoryUrl}/tree/main/`,
```

- The GitHub link in the navbar points to the own repository `jeromewinkler-Omega/dso-blog` instead of the template

### 4. Navbar and footer revised

**File:** `docusaurus.config.ts`

| Column | Change |
| --- | --- |
| Docs | Added link to project overview `/docs/projects/overview` |
| Community | Removed and replaced with the **Projects** column |
| Projects | Links to Overview and Docusaurus Blog |
| More | GitHub link to the own repository, new links **Template** and **ScreenPal** |

The blog link is only added to the navbar and footer when the blog is enabled.
The previously hard-coded footer entry was removed, because it caused a broken-link build error with `BLOG_ENABLED=false`:

```typescript
if (blogEnabled) {
  (config.themeConfig.navbar as any).items.push({to: '/blog', label: 'Blog', position: 'left'});
  (config.themeConfig.footer as any).links[2].items.push({to: '/blog', label: 'Blog'});
}
```

### 5. Project documentation

**Folder:** `docs/projects/`

```
docs/projects/
├── _category_.yaml
├── overview.mdx
├── docusaurus-blog.md
├── example-project.md
├── project2.md
├── project3.md
└── vserver-setup.md
```

- `overview.mdx` as the entry page, linked via `_category_.yaml`
- New pages `docusaurus-blog.md`, `project2.md` and `project3.md` (the latter two as placeholders)
- File names in `docs/projects/` are lowercase, so the paths resolve correctly on Linux systems (GitHub Actions, GitHub Pages)
- Pages using the `GithubLinkAdmonition` component import it explicitly
  (`import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';`,
  with a blank line before and after), otherwise the production build fails

### 6. Logo, favicon and social card

**Files:** `static/img/omega-icon.svg`, `static/img/favicon.ico`, `static/img/z_nano_core_social_card_v2.png`, `docusaurus.config.ts`

- Own Omega icon as navbar logo (SVG) and favicon (ICO with 16, 32 and 48 px)
- Custom social card (1200 × 630 px) in Z-Nano-Core design replaces the Docusaurus default image.
  It is not shown on the site itself, only as the preview image when a link is shared:

```typescript
favicon: 'img/favicon.ico',
image: 'img/z_nano_core_social_card_v2.png',
```

### 7. Styling

**File:** `src/css/custom.css`

Colors and layout adapted to the Z-Nano-Core design.

### 8. Blog

**Files:** `blog/authors.yml`, `blog/2019-05-28-first-blog-post.md`, `blog/2021-08-26-welcome/`

- Author information updated
- Blog posts revised
- Z-Nano-Core banner included in the welcome post

### 9. Deployment

**Folder:** `.github/workflows/`

- The template's **CI/CD Workflow** builds the site on every push and pull request and deploys it to GitHub Pages only from `main`
- The additionally created "Static HTML" workflow (`static.yml`) was removed. It published the repository without a build and caused a 404 on the live site
- GitHub Pages source: **GitHub Actions**, environment: `github-pages`
- Before pushing, `npm run build` should be run locally, because some errors (broken links, missing MDX imports) only appear in the production build, not with `npm start`

### Commit overview

| Commit | Description |
| --- | --- |
| `.gitignore` | All env files excluded |
| `example.env` | Variables updated |
| `fix` | webpack pinned to 5.95.0 |
| Configuration | Own repository and GitHub Pages |
| Docs | Project overview and project pages |
| Social card | Own preview image added |
| `style` | Colors and layout |
| Blog | Authors, posts and banner |
| UI | Logo, favicon and title |
| Fix | Build errors fixed: blog link and project pages |
| CI | Redundant Static HTML workflow removed |
| README | Documentation of changes |
