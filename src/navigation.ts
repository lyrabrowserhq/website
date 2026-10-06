import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'News', href: getBlogPermalink() },
    { text: 'Sync', href: getPermalink('/sync') },
    { text: 'About', href: getPermalink('/about') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [
    {
      text: 'Download',
      href: getPermalink('/download'),
      variant: 'primary' as const,
      icon: 'tabler:download',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Lyra Browser',
      links: [
        { text: 'Download', href: getPermalink('/download') },
        { text: 'News', href: getBlogPermalink() },
        { text: 'Releases', href: 'https://github.com/lyrabrowserhq/lyra-browser/releases' },
      ],
    },
    {
      title: 'Project',
      links: [
        { text: 'Source', href: 'https://github.com/lyrabrowserhq/lyra-browser' },
        { text: 'Issues', href: 'https://github.com/lyrabrowserhq/lyra-browser/issues' },
        { text: 'Seek', href: 'https://seek.lyrabrowser.com/' },
        { text: 'Sync', href: getPermalink('/sync') },
        { text: 'Branding', href: getPermalink('/branding') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy', href: getPermalink('/privacy') },
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/lyrabrowserhq/lyra-browser' },
  ],
  footNote: 'Lyra Browser. Engine under MPL-2.0. Not affiliated with Mozilla.',
};
