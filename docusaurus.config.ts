import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig}  from "dotenv";

dotenvconfig();

/* TODO: change to read configuration from environment */
const blogEnabled = Boolean(process.env.BLOG_ENABLED === 'true')
const newFeatureEnabled = Boolean(process.env.NEW_FEATURE_ENABLED !== 'false')

const config: Config = {
  title: 'DSO Live Blog to verify my live Project diary ',
  tagline: 'Combining a relentless drive for efficiency with meticulous attention to detail, I am fully focused on transitioning into the DevSecOps landscape and mastering the challenges ahead.l',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.DEPLOYMENT_URL ?? "https://jeromewinkler-Omega.github.io/", //"https://spmse.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL ?? "/dso-blog/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.GITHUB_ORG ?? 'jeromewinkler-Omega',// Usually your GitHub org/user name.
  projectName: process.env.GITHUB_PROJECT ?? 'dso-blog', // Usually your repo name.

  deploymentBranch: process.env.DEPLOYMENT_BRANCH ?? 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jeromewinkler-Omega/dso-blog',//'https://github.com/spmse/dev-blog-template',
        },
        blog: blogEnabled ? 
          {
            showReadingTime: true,
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/spmse/dev-blog-template',
            // Useful options to enforce blogging best practices
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'warn',
          }
          : false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/jeromewinkler-Omega/dso-blog',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/guides/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sven Patrick Meier (spmse). Built with Docusaurus and 💚.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};


if (blogEnabled) {
  (config.themeConfig.navbar as any).items.push({to: '/blog', label: 'Blog', position: 'left'});
  (config.themeConfig.footer as any).links[2].items.push({to: '/blog', label: 'Blog'});
}

export default config;
