module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx astro preview --host 127.0.0.1 --port 4392',
      startServerReadyPattern: '4392',
      url: [
        'http://127.0.0.1:4392/',
        'http://127.0.0.1:4392/about',
        'http://127.0.0.1:4392/download',
        'http://127.0.0.1:4392/contact',
        'http://127.0.0.1:4392/sync',
        'http://127.0.0.1:4392/branding',
        'http://127.0.0.1:4392/privacy',
        'http://127.0.0.1:4392/terms',
        'http://127.0.0.1:4392/news',
        'http://127.0.0.1:4392/news/lyra-0-5-0',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'total-byte-weight': ['warn', { maxNumericValue: 1_200_000 }],
        'unused-javascript': ['warn', { maxNumericValue: 100_000 }],
        'uses-responsive-images': ['warn', { minScore: 0.9 }],
        'unsized-images': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
