# ai-web-coding-benchmark

Claude Code で Web ページを生成する検証を行うためのリポジトリです。

## 必要なもの

- Claude Code のアカウント
- Dev Container が使えるエディタ

## 使い方

1. Dev Container で環境を立ち上げる
    - devcontainer.json を用意しているので、Dev Container 対応のエディタでリポジトリを開くだけで OK です。
    - 以降の手順は開発コンテナ内で行います。
2. claude code をセットアップする
    - `claude` を実行して、指示に従ってセットアップしてください。
3. 別のターミナルで、開発サーバーを起動する。
    - `npm run dev`
4. ブラウザで http://localhost:5173 にアクセスして結果を確認してください。

## その他操作

- 参考用のスクリーンショットを撮る場合は、`npm run capture -- <URL or FilePath>` を実行してください。
    - `scripts/capture-reference.js` が実行され、スクリーンショットが `work/reference.png` として保存されます。
    - URL の代わりにローカルファイルパスも指定できます: `npm run capture -- ./work/generated/index.html`
