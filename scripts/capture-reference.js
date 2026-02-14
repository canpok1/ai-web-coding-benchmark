// scripts/capture-reference.js
// 使用法: node scripts/capture-reference.js <URL or FilePath>
// 例: node scripts/capture-reference.js https://example.com
// 例: node scripts/capture-reference.js ./work/generated/index.html

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

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
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  // 保存先を benchmark/ に固定
  const absoluteDir = path.resolve(process.cwd(), 'work');
  const savePath = path.join(absoluteDir, 'reference.png');

  console.log(`Capturing ${url}...`);

  try {
    // ディレクトリがなければ作成
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true });
    }

    await page.goto(url, { waitUntil: 'networkidle' });

    // フルページ撮影
    await page.screenshot({ path: savePath, fullPage: true });

    console.log(`Success! Reference saved to: ${savePath}`);
  } catch (error) {
    console.error(`Failed: ${error.message}`);
  } finally {
    await browser.close();
  }
})();
