import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

test.use({
  baseURL: process.env.TARGET_URL || 'http://localhost:5173',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
});

for (const vp of VIEWPORTS) {
  test(`見た目の再現度チェック (${vp.name}: ${vp.width}x${vp.height})`, async ({ page }) => {
    const targetUrl = process.env.TARGET_URL;
    const bmDir = process.env.TARGET_BM_DIR;

    if (!targetUrl || !bmDir) {
      throw new Error('TARGET_URL or TARGET_BM_DIR is not defined');
    }

    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(targetUrl);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`reference-${vp.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      threshold: 0.1,
    });
  });
}
