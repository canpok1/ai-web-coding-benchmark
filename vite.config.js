import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// benchmarks配下の各フォルダにある generated/index.html を自動スキャン
const getBenchmarkEntries = () => {
  const bmDir = path.resolve(__dirname, 'benchmarks');
  const entries = {
    main: path.resolve(__dirname, 'index.html') // ルートの目次
  };

  if (fs.existsSync(bmDir)) {
    const folders = fs.readdirSync(bmDir);
    folders.forEach(dir => {
      const htmlPath = path.resolve(bmDir, dir, 'generated/index.html');
      if (fs.existsSync(htmlPath)) {
        // Viteのビルド・サーブ対象に追加
        entries[`benchmark-${dir}`] = htmlPath;
      }
    });
  }
  return entries;
};

export default defineConfig({
  // ルートディレクトリをプロジェクト直下に設定
  root: './',
  build: {
    rollupOptions: {
      input: getBenchmarkEntries()
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    // /benchmarks/lp/generated/ へのアクセスを許可
    fs: {
      allow: ['..']
    }
  }
});