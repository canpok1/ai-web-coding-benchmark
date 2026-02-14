import { test, expect } from '@playwright/test';

test.use({
  baseURL: process.env.TARGET_URL || 'http://localhost:5173',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
});

test('見た目の再現度チェック', async ({ page }) => {
  // スクリプトから渡された比較対象のURLへ移動
  const targetUrl = process.env.TARGET_URL;
  const bmDir = process.env.TARGET_BM_DIR;

  if (!targetUrl || !bmDir) {
    throw new Error('TARGET_URL or TARGET_BM_DIR is not defined');
  }

  await page.goto(targetUrl);

  // Webフォントや画像の読み込みを待機
  await page.waitForLoadState('networkidle');

  // benchmarks/xx/reference.png と現在の画面を比較
  await expect(page).toHaveScreenshot('reference.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02, // 2%以上の差でアラート
    threshold: 0.1,          // 色の差の許容値
  });
});
