import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('home request, heap, and layout-shift budgets', async ({ page }) => {
  const requests: { url: string; size: number }[] = [];
  page.on('response', async (response) => {
    const url = response.url();
    const headers = response.headers();
    const length = Number(headers['content-length'] || 0);
    requests.push({ url, size: Number.isFinite(length) ? length : 0 });
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const shifts = performance.getEntriesByType('layout-shift') as (PerformanceEntry & {
      value: number;
      hadRecentInput: boolean;
    })[];
    const cls = shifts.filter((entry) => !entry.hadRecentInput).reduce((sum, entry) => sum + entry.value, 0);
    const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const transfer = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
    return {
      cls,
      resourceCount: resources.length,
      transfer,
      heap: memory?.usedJSHeapSize ?? 0,
      lcpCandidates: performance.getEntriesByType('largest-contentful-paint').length,
      ttfb: nav ? nav.responseStart - nav.requestStart : 0,
    };
  });

  expect(metrics.cls, `CLS ${metrics.cls}`).toBeLessThan(0.1);
  expect(metrics.resourceCount, `resources ${metrics.resourceCount}`).toBeLessThan(40);
  expect(metrics.transfer, `transfer ${metrics.transfer}`).toBeLessThan(1_200_000);
  if (metrics.heap > 0) {
    expect(metrics.heap, `heap ${metrics.heap}`).toBeLessThan(50 * 1024 * 1024);
  }
  expect(requests.length, `requests ${requests.length}`).toBeLessThan(45);
});
