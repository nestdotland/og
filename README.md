# Nest OG Image Generator

Service that dynamically generates [Open Graph](https://ogp.me/) images for [Nest](https://nest.land) that looks something like

<img width="600" src="https://og.nest.land/api/image?layoutName=Pattern&Text=Hello+World" />

# ✨ How To Use

Use the generated image URL in the `<head>` of your HTML document as the og:image meta property

```html
<meta
  property="og:image"
  content="https://og.nest.land/api/image?layoutName=Pattern&Text=Hello+World"
/>
```

Whenever this image is requested (e.g. in link previews) the image will be generated on demand.

# 🧐 How It Works

Images are generated through the `/api/image` route. When you hit this route the following happens

- Query params are parsed
- Layout is looked up in list of layouts using the `layoutName` query param
- `layout.getCSS` called with all query params
- `layout.Component` is rendered with all query params as `config` prop
- HTML page built, rendered with Puppeteer, and screenshot
- Screenshot returned with a long cache max age

## Layouts

This service can generate images using multiple _layouts_. A layout is defined as a

- Collection of properties that are user configurable. The UI for these properties is auto genearted
- Function that takes in layout config and returns CSS needed to render
- A React component that takes in layout config as a prop

# 🚀 Development

To start hacking, do the following:

1. [Fork](https://github.com/nestdotland/og/fork) this repo and clone it
2. Run `yarn` or `npm install` to install all dependencies
3. Run locally with `yarn dev` and visit [`localhost:3000`](http://localhost:3000)

Now you're ready to start local development!

The frontend is a [NextJS](https://nextjs.org) site and the image generation happens in an API route.

```
# Start local development server
yarn dev

# Build for production
yarn build

# Start in production
yarn start
```

# 🙌 Acknowledgement

Credit where credit is due. This started as a forked repo from [Railway's OG image generator](https://og.railway.app/). The main differences are

# License

This project is distributed under [The MIT Licese](./LICENSE)
