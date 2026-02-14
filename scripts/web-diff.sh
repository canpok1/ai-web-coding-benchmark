#!/bin/bash

BM_PATH="work"

# generated フォルダが存在するかチェック
if [ ! -d "$BM_PATH/generated" ]; then
  echo "Error: $BM_PATH/generated does not exist."
  exit 1
fi

echo "Comparing Visual Difference..."

# サーバーのURLと対象ディレクトリを環境変数で渡す
export TARGET_BM_DIR="$(pwd)/$BM_PATH"
export TARGET_URL="http://localhost:5173/work/generated/index.html"

# Playwright実行（共通テストを利用）
npx playwright test ./web-diff.spec.js --output="$(pwd)/$BM_PATH/results"

echo "Comparison complete."
echo "View report: npx playwright show-report"
