import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        const hasCaption =
          Array.isArray(child.children) &&
          child.children.some((node) => node.type === 'element' && node.tagName === 'caption');
        if (!hasCaption) {
          let captionText = 'Table';
          for (let j = i - 1; j >= 0; j--) {
            const prev = tree.children[j];
            if (prev.type === 'element' && /^h[1-6]$/.test(prev.tagName || '')) {
              captionText = toString(prev);
              break;
            }
          }
          child.children = [
            {
              type: 'element',
              tagName: 'caption',
              properties: { class: 'sr-only' },
              children: [{ type: 'text', value: captionText }],
            },
            ...(child.children || []),
          ];
        }
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        i++;
      }
    }
  };
};
