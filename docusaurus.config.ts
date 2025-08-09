import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'HKTech',
  tagline: '分享技術與生活的部落格',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blog.hkchen.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hktech', // Usually your GitHub org/user name.
  projectName: 'hktech', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Performance optimizations
  // webpack: {
  //   jsLoader: (isServer) => ({
  //     loader: require.resolve('swc-loader'),
  //     options: {
  //       jsc: {
  //         parser: {
  //           syntax: 'typescript',
  //           tsx: true,
  //         },
  //         target: 'es2017',
  //       },
  //       module: {
  //         type: isServer ? 'commonjs' : 'es6',
  //       },
  //     },
  //   }),
  // },

  // Enable compression and optimization
  staticDirectories: ['static'],

  // Optimize bundle splitting
  // clientModules: [
  //   require.resolve('./src/clientModules/preloadFonts.js'),
  // ],

  // Set the default locale for the site
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'], // 只保留繁體中文
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs for blog-only site
        blog: {
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '最近文章',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove edit links for now
          // editUrl: 'https://github.com/your-org/blog-vibe/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // gtag: {
        //   trackingID: 'YOUR_TRACKING_ID',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Local search plugin with Chinese support
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // 支援中文搜尋
        hashed: true,
        language: ['zh'], // 只保留中文
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        // 搜尋範圍配置
        indexDocs: false, // 不索引文檔（因為我們只有部落格）
        indexBlog: true,  // 索引部落格文章
        indexPages: false, // 不索引頁面
        // 中文分詞配置
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'HKTech',
      logo: {
        alt: 'HKTech Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/blog', label: '部落格', position: 'left' },
        { to: '/blog/tags', label: '標籤', position: 'left' },
        { to: '/blog/archive', label: '歸檔', position: 'left' },
        { to: '/about', label: '關於', position: 'left' },
        {
          href: 'https://github.com/hkchen',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '內容',
          items: [
            {
              label: '部落格',
              to: '/blog',
            },
            {
              label: '標籤',
              to: '/blog/tags',
            },
          ],
        },
        {
          title: '社群',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hkchen',
            },

          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '關於',
              to: '/about',
            },
          ],
        },
      ],
      copyright: `Copyright © HK Chen`,
    },
    prism: {
      theme: prismThemes.vsDark, // 使用深色主題以配合終端機風格
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'yaml', 'typescript', 'javascript'],
    },
    // Algolia DocSearch configuration
    // To enable search:
    // 1. Apply for DocSearch at https://docsearch.algolia.com/apply/
    // 2. Replace the placeholder values below with your actual Algolia credentials
    // 3. Uncomment the algolia configuration

    // algolia: {
    //   // The application ID provided by Algolia
    //   appId: 'YOUR_APP_ID',
    //   
    //   // Public API key: it is safe to commit it
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   
    //   // The index name
    //   indexName: 'hktech',
    //   
    //   // Enable contextual search for better results
    //   contextualSearch: true,
    //   
    //   // Search parameters for fine-tuning
    //   searchParameters: {
    //     facetFilters: ['language:zh-Hant', 'language:en'],
    //   },
    //   
    //   // Enable search page
    //   searchPagePath: 'search',
    //   
    //   // Disable insights for privacy
    //   insights: false,
    //   
    //   // Custom placeholder text
    //   placeholder: '搜尋文章...',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
