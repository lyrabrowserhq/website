import { test, expect } from '@playwright/test';
import { DOWNLOAD, downloadUrl, formatSize } from '../src/data/downloads';

test('formatSize uses MB below 1 GB', () => {
  expect(formatSize(1024 * 1024)).toBe('1.0 MB');
  expect(formatSize(122825544)).toBe('117.1 MB');
});

test('formatSize uses GB at 1 GB and above', () => {
  expect(formatSize(1024 * 1024 * 1024)).toBe('1.0 GB');
});

test('downloadUrl points at the tagged GitHub asset', () => {
  expect(downloadUrl('linux')).toBe(`${DOWNLOAD.origin}/${DOWNLOAD.tag}/${DOWNLOAD.linux.file}`);
  expect(downloadUrl('windows')).toBe(`${DOWNLOAD.origin}/${DOWNLOAD.tag}/${DOWNLOAD.windows.file}`);
});
