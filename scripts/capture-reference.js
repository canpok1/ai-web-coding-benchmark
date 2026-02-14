// scripts/capture-reference.js
// 使用法: node scripts/capture-reference.js <URL> <保存先ディレクトリ>
// 例: node scripts/capture-reference.js https://example.com ./benchmarks/lp

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const url = process.argv[2];
const outputDir = process.argv[3];

if (!url || !outputDir) {
  console.error('Usage: node scripts/capture-reference.js <URL> <output-directory>');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  // 保存先ディレクトリを解決
  const absoluteDir = path.resolve(process.cwd(), outputDir);
  const savePath = path.join(absoluteDir, 'reference.png');

  console.log(`📸 Capturing ${url}...`);
  
  try {
    // ディレクトリがなければ作成
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true });
    }

    await page.goto(url, { waitUntil: 'networkidle' });
    
    // フルページ撮影
    await page.screenshot({ path: savePath, fullPage: true });
    
    console.log(`✅ Success! Reference saved to: ${savePath}`);
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
  } finally {
    await browser.close();
  }
})();
