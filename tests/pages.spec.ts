import { test, expect } from '@playwright/test';
import { pages } from './pages';

test('home hero copy', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('An actual private and secure browser');
  await expect(page.locator('main')).toContainText(
    'Lyra is not just another fork of Firefox ESR but an anti-convenience one tailored for people who really care about their privacy and security on the modern web.'
  );
});

test('footer subtitle', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toContainText('Firefox ESR overlay. Address-bar search goes to Seek.');
  await expect(page.locator('footer')).not.toContainText('Ads blocked. Linux and Windows.');
});

for (const path of pages) {
  test(`landmarks ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('#content')).toHaveCount(1);
  });
}
