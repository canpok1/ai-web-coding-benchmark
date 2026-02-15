// scripts/capture-reference.js
// 使用法: node scripts/capture-reference.js <URL or FilePath>
// 例: node scripts/capture-reference.js https://example.com
// 例: node scripts/capture-reference.js ./work/generated/index.html

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

const input = process.argv[2];

if (!input) {
  console.error('Usage: node scripts/capture-reference.js <URL or FilePath>');
  process.exit(1);
}

const url = /^https?:\/\//.test(input)
  ? input
  : 'file://' + path.resolve(process.cwd(), input);

(async () => {
  const browser = await chromium.launch();
  const absoluteDir = path.resolve(process.cwd(), 'work');

  console.log(`Capturing ${url}...`);

  try {
    // ディレクトリがなければ作成
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true });
    }

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height }
      });
      await page.goto(url, { waitUntil: 'networkidle' });
      const savePath = path.join(absoluteDir, `reference-${vp.name}.png`);
      await page.screenshot({ path: savePath, fullPage: true });
      console.log(`  Saved: ${savePath} (${vp.width}x${vp.height})`);
      await page.close();
    }

    console.log('Success! All reference images saved.');
  } catch (error) {
    console.error(`Failed: ${error.message}`);
  } finally {
    await browser.close();
  }
})();
