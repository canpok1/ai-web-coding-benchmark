#!/bin/bash

# 使用法: ./scripts/web-diff.sh lp
TARGET=$1

if [ -z "$TARGET" ]; then
  echo "Error: Benchmark target name is required (e.g., lp)"
  exit 1
fi

BM_PATH="benchmarks/$TARGET"

# generated フォルダが存在するかチェック
if [ ! -d "$BM_PATH/generated" ]; then
  echo "Error: $BM_PATH/generated does not exist. Please generate code first."
  exit 1
fi

echo "🔍 Comparing Visual Difference for: $TARGET"

# サーバーのURLと対象ディレクトリを環境変数で渡す
export TARGET_BM_DIR="$(pwd)/$BM_PATH"
export TARGET_URL="http://localhost:5173/benchmarks/$TARGET/generated/index.html"

# Playwright実行（共通テストを利用）
npx playwright test common-tests/visual.spec.js --output="$(pwd)/$BM_PATH/results"

echo "✅ Comparison complete."
echo "View report: npx playwright show-report"
