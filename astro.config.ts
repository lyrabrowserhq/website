import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, fontProviders } from 'astro/config';

import { unified } from '@astrojs/markdown-remark';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import compress from 'astro-compress';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      weights: ['400', '500', '600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Space Mono',
      cssVariable: '--font-space-mono',
      weights: ['400', '700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    sitemap(),
    mdx(),
    icon({
      iconDir: 'src/assets/icons',
      include: {
        tabler: [
          'rss',
          'brand-github',
          'moon',
          'sun',
          'chevron-down',
          'chevron-left',
          'chevron-right',
          'clock',
          'user',
          'ad-2',
          'cloud-off',
          'shield-off',
          'refresh-off',
          'cube',
          'cpu',
          'map-pin-off',
          'fingerprint',
          'search',
          'download',
          'world',
          'lock',
          'file-certificate',
          'history',
          'network',
          'mail',
          'map-pin',
          'cookie',
        ],
      },
    }),
    compress({
      CSS: { csso: false, lightningcss: { minify: true } },
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({
      config: './src/config.yaml',
    }),
  ],
  image: {
    domains: [],
    responsiveStyles: true,
  },
  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
