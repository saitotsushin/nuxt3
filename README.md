# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

https://saitotsushin.github.io/nuxt3/

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

```githubpages->deploy
# npm
npm run deploy
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# 画像加工
https://www.shutterstock.com/ja/blog/how-to-turn-any-photograph-into-pixel-art-with-photoshop

# 3Dcssの参考
https://digipress.info/tech/3d-hovering-motion-with-chasing-cursor-sample/

# 遷移時のアニメーション
https://ma-vericks.com/blog/nuxt3-page-transition-animation/

# node
```
Cannot start nuxt:  The requested module 'node:module' does not provide an export named 'isBuiltin'
```

# 画像を合わせる
https://qiita.com/watabo_shi/items/0811d03390c18e46be86

# モザイク
https://wgld.org/d/webgl/w066.html
https://blog.design-nkt.com/osyare-glsl2/

# WebGLRenderTargetで色味が変わってしまう
暗くなってしまう問題。
https://blog.shoya-kajita.com/webglrendertarget-colorspace/

# オフスクリーンレンダリングで背景が黒くなる
シェーダーの問題でした。
アルファ値が0でも処理->計算できない->黒にする
になってた。アルファがある時は処理しないようにした。

# ページ遷移時のエラー
```
Failed to execute 'shaderSource' on 'WebGL2RenderingContext': parameter 1 is not of type 'WebGLShader'
```
アニメーションループがページ遷移後も続いている場合、シェーダーが適切に解放されずにエラーが発生することがあります。アニメーションを正しく停止させるために、cancelAnimationFrame を呼び出すことを忘れないでください。

# scss
https://zenn.dev/shuto2828/articles/e21134245671ce