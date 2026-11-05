## Changes in the branch `feature/projekt-dokumentation`

All adjustments have been implemented on the feature branch 'feature/project-documentation'
and are merged into 'main' via pull request after release.

### 1. Security: env files excluded

**Datei:** `.gitignore`

All environment files are excluded from the repository. Only the template 'example.env' is allowed.

```ignore
.env
.env.*
*.env
!example.env
```

**File:** `example.env`

Contains only placeholders and shows which variables are needed:

```dotenv
BLOG_ENABLED=false
DEPLOYMENT_URL=https://your-docusaurus-site.example.com
DEPLOYMENT_BRANCH=github-pages
BASE_URL=/dso-blog/
GITHUB_ORG=jeromewinkler-Omega
GITHUB_PROJECT=dso-blog
```

For local operation, a separate '.env' is created from it ('Copy-Item example.env .env'), which does not enter the repository.

### 2. Bug fix: webpack compatibility

**Dateien:** `package.json`, `package-lock.json`

**Problem:** The server did not start:

```
Cannot find module 'webpack/lib/ContextReplacementPlugin'
```

**Cause:** '@docusaurus/theme-classic' 3.5.2 loads this file directly from its path. In webpack 5.112.x it no longer exists.

**Solution:** webpack set to a compatible version:

```json
"devDependencies": {
  "webpack": "5.95.0"
},
"overrides": {
  "webpack": "5.95.0"
}
```

### 3. Page configuration changed to own repository

**File:** 'docusaurus.config.ts'

- Title and tagline adapted to your own project
- Fallback values for GitHub Pages deployment if no '.env' is present:

```typescript
url: process.env.DEPLOYMENT_URL ?? 'https://jeromewinkler-omega.github.io',
baseUrl: process.env.BASE_URL ?? '/dso-blog/',
organizationName: process.env.GITHUB_ORG ?? 'jeromewinkler-Omega',
projectName: process.env.GITHUB_PROJECT ?? 'dso-blog',
deploymentBranch: process.env.DEPLOYMENT_BRANCH ?? 'gh-pages',
```

- `editUrl` for docs and blog as well as the GitHub link in the navbar point to your own repository 'jeromewinkler-Omega/dso-blog' instead of the template

### 4. Footer revised

**File:** 'docusaurus.config.ts'

| Column | Change |
| --- | --- |
| Docs | Added link to project overview '/docs/projects/overview' |
| Community | Removed and replaced with the **Projects** column |
| Projects | Links zu Overview, Docusaurus Blog, Project 2 und Project 3 |
| More | GitHub link to your own repository, new link **Template** to the source template |

The blog link will only be displayed if the blog is activated. This prevents a broken link if 'BLOG_ENABLED=false' is set:

```typescript
...(blogEnabled ? [{ label: 'Blog', to: '/blog' }] : []),
```

### 5. Project documentation

**Ordner:** `docs/projects/`

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

- 'overview.mdx' as an entry page, linked via '_category_.yaml'
- New pages 'docusaurus-blog.md', 'project2.md' and 'project3.md'
- All folder and file names are uniformly lowercase, so that the paths are also resolved correctly on Linux systems (GitHub Actions, GitHub Pages)

### 6. Social Card

**Dateien:** `static/img/z_nano_core_social_card_v2.png`, `docusaurus.config.ts`

Custom social card (1200 × 630 px) in Z-Nano-Core design replaces the Docusaurus standard image:

```typescript
image: 'img/z_nano_core_social_card_v2.png',
```

### 7. Styling

**Datei:** `src/css/custom.css`

Colors and layout adapted to the Z-Nano-Core design.

### 8. Blog

**Dateien:** `blog/authors.yml`, `blog/2019-05-28-first-blog-post.md`, `blog/2021-08-26-welcome/`

- Author information updated
- Blog posts revised
- Z-Nano-Core banner included in the welcome post

### Commit Overview

| Commit | Beschreibung |
| --- | --- |
| `.gitignore` | Alle env-Dateien ausgeschlossen |
| `example.env` | Platzhalter aktualisiert |
| `fix` | webpack auf 5.95.0 festgesetzt |
| Konfiguration | Eigenes Repo und GitHub Pages |
| Docs | Projektübersicht und Projektseiten |
| Social Card | Eigenes Vorschaubild eingebunden |
| `style` | Farben und Layout |
| Blog | Authors, Posts and Banners |
| README | Documentation of Changes |
At point 7 (CSS) I only formulated in general terms, because I don't know the concrete changes. Add there what you have really adjusted. With git show a15933d you can see it.
Then commit and push:
powershell
git add README.md
git commit -m "docs: README added description of code changes"
git push
