#!/bin/bash

BM_PATH="work"

# generated フォルダが存在するかチェック
if [ ! -d "$BM_PATH/generated" ]; then
  echo "Error: $BM_PATH/generated does not exist."
  exit 1
fi

claude --dangerously-skip-permissions << EOS
${BM_PATH}/reference.png の見た目・レイアウトを極めて高い精度で再現したWebページを作成してください。

## 実装条件
- 出力先: ${BM_PATH}/generated/ ディレクトリ内にすべてのファイルを配置すること。
- 技術スタック: HTML, CSS, JavaScript を使用し、モダンなコーディングを行ってください。
- 構成ファイル: index.html, main.js を基本とし、必要に応じて style.css を作成してください。

## 禁止事項
- ${BM_PATH}/generated/ 以外のディレクトリにファイルを生成・変更しないでください。
- 外部の複雑なライブラリ（React, Vue等）は使用せず、Vanilla JSで実装してください。
EOS
