import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate: `${process.env.TARGET_BM_DIR}/{arg}{ext}`,
  fullyParallel: false, // 1つずつ確実に検証
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env.TARGET_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // 比較時のデフォルト設定
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05, // 5%以上の差でアラート
      threshold: 0.2,          // アンチエイリアス等の微細な差を無視
    },
  },
});
