# MuseMindDraw

![Demo](assets/museminddraw.gif)  

MuseMindDraw は、AI を利用してユーザーからのテキストプロンプトに基づいて画像を生成するウェブアプリケーションです。クリエイティブなインスピレーションを提供し、芸術的なアイデアを視覚化するためのツールとして設計されています。

## 特徴

- テキストプロンプトに基づいてカスタマイズされた画像生成
- ユーザーフレンドリーなインターフェイス
- レスポンシブデザインでさまざまなデバイスに対応
- インスピレーションの源としての応用可能性

## インストール

このアプリケーションをローカル環境で実行するには、以下のステップに従ってください。

1. リポジトリをクローンする：

```bash
git clone https://github.com/Utricularor/Muse-Mind-Draw.git
```


2. 必要な依存関係をインストールする：

```bash
cd museminddraw
npm install
```

3. アプリケーションをローカルサーバーで起動する：

```bash
cd image-generator-app
npm start
```

4. APIをローカルサーバーで起動する:

```bash
poetry run python image_generate_api/main.py
```


これにより、[http://localhost:○○](http://localhost:○○) でアプリケーションが開きます。

## 使用方法

1. テキストボックスに画像の生成に使いたいテキストプロンプトを入力します。
2. 「Generate Image」ボタンをクリックして画像を生成します。
3. 生成された画像は画面に表示され、ダウンロードすることも可能です。

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。
