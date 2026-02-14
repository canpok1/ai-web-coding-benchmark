import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate: `${process.env.TARGET_BM_DIR}/{arg}{ext}`,
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
});
