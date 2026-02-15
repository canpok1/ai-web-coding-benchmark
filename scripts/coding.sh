#!/bin/bash

BM_PATH="work"

# generated フォルダが存在するかチェック
if [ ! -d "$BM_PATH/generated" ]; then
  echo "Error: $BM_PATH/generated does not exist."
  exit 1
fi

claude --dangerously-skip-permissions << EOS
${BM_PATH}/reference.png の見た目・レイアウトを極めて高い精度で再現したWebページを作成してください。
npm run web-diff を実行すると差分を確認できますので、差分がなくなるように実装してください。

## 実装条件
- 出力先: ${BM_PATH}/generated/ ディレクトリ内にすべてのファイルを配置すること。
- 技術スタック: HTML, CSS, JavaScript を使用し、モダンなコーディングを行ってください。
- 構成ファイル: index.html を基準に、必要に応じて CSS や JavaScript ファイルを作成してください。
- 分割のルール:
  - 1ファイルあたりの行数は100行程度を目安にしてください。
  - 積極的にファイルを分割し、モジュール化を図ってください。
  - モジュールはWebコンポーネントとして実装してください。
  - CSSはモジュール内にカプセル化してください。

## 禁止事項
- ${BM_PATH}/generated/ 以外のディレクトリにファイルを生成・変更しないでください。
- 外部の複雑なライブラリ（React, Vue等）は使用せず、Vanilla JSで実装してください。

## 実装のコツ
- ページ全体の構造をブロック単位で捉えるところから始めると良いです。
  - ヘッダー、メイン、フッターに分けるイメージです。
- その次に背景の差分をなくすことから始め、次にレイアウトを整え、最後に細部のスタイルを調整することをおすすめします。
EOS
