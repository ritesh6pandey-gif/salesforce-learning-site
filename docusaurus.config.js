// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ritesh's Learning Platform",
  tagline: 'Free, independent Salesforce courses for admins and developers',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
  ],

  // TODO before deploying: set this to the real hosted URL (e.g. your
  // GitHub Pages / Cloudflare Pages / Netlify URL) and update baseUrl to
  // match your chosen host's requirements.
  url: 'https://example.com',
  baseUrl: '/',

  // TODO before deploying: only needed if you deploy to GitHub Pages.
  organizationName: 'your-org-or-username',
  projectName: 'salesforce-learning-site',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexPages: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Ritesh's Learning Platform",
        logo: {
          alt: "Ritesh's Learning Platform Logo",
          src: 'img/logo.svg',
        },
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'salesforceIntegrationSidebar',
            position: 'left',
            label: 'Salesforce Integration',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Course',
            items: [
              {
                label: 'Salesforce Integration',
                to: '/docs/salesforce-integration/integration-patterns',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Home',
                to: '/',
              },
            ],
          },
        ],
        copyright: `Independent learning site, not affiliated with or endorsed by Salesforce. © ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
