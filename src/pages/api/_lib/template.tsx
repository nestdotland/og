import { layouts } from "../../../layouts";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { IConfig, ILayoutConfig, LayoutComponent } from "../../../types";
import { sanitizeHtml } from "./sanitizer";

const getCommonCSS = () => {
  return `
  @supports (font-variation-settings: normal) {
    @font-face {
      font-display: optional;
      font-family: "Inter";
      font-named-instance: "Regular";
      font-style: normal;
      font-weight: 100 900;
      src: url("https://og.nest.land/fonts/sans/Inter-roman.latin.var.woff2") format("woff2 supports variations"),
        url("https://og.nest.land/fonts/sans/Inter-roman.latin.var.woff2") format("woff2-variations");
      unicode-range: U+0000-007F, U+00A0-0100, U+0131, U+0152-0154, U+02BB-02BD, U+02C6, U+02DA, U+02DC, U+2000-200C, U+2010-2028, U+202F-2060,
        U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+FEFF;
    }
  
    @font-face {
      font-display: optional;
      font-family: "Inter";
      font-named-instance: "Italic";
      font-style: italic;
      font-weight: 100 900;
      src: url("https://og.nest.land/fonts/sans/Inter-italic.latin.var.woff2") format("woff2 supports variations"),
        url("https://og.nest.land/fonts/sans/Inter-italic.latin.var.woff2") format("woff2-variations");
      unicode-range: U+0000-007F, U+00A0-0100, U+0131, U+0152-0154, U+02BB-02BD, U+02C6, U+02DA, U+02DC, U+2000-200C, U+2010-2028, U+202F-2060,
        U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+FEFF;
    }
  
    @font-face {
      font-display: optional;
      font-family: "Lora";
      font-style: normal;
      font-weight: 400 700;
      src: url("https://og.nest.land/fonts/serif/Lora-VF.woff2") format("woff2 supports variations"), url("/fonts/serif/Lora-VF.woff2") format("woff2-variations");
    }
  
    @font-face {
      font-display: optional;
      font-family: "Lora";
      font-style: italic;
      font-weight: 400 700;
      src: url("https://og.nest.land/fonts/serif/Lora-Italic-VF.woff2") format("woff2 supports variations"),
        url("https://og.nest.land/fonts/serif/Lora-Italic-VF.woff2") format("woff2-variations");
    }
  }
  
  @font-face {
    font-display: optional;
    font-family: "JetBrains Mono";
    font-style: normal;
    font-weight: normal;
    src: url("https://og.nest.land/fonts/mono/JetBrainsMono-Regular.woff2") format("woff2");
  }

    body {
      background-size: 100px 100px;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 100px;
      margin: 0;
      padding: 0;
    }

    * {
      box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, p {
      margin: 0;
    }

    code {
      color: #D1D5DB;
      font-family: 'JetBrains Mono', monospace;
      white-space: pre-wrap;
      font-weight: 400;
    }

    img.emoji {
      width: 1.25ch;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
    }
`;
};

const NotImplemented: LayoutComponent = ({ config }) => (
  <h1 style={{ fontSize: 100 }}>{config.layoutName} not implemented</h1>
);

export const getHtml = (config: IConfig & ILayoutConfig) => {
  const layout = layouts.find(l => l.name === config.layoutName);

  const rendered = ReactDOMServer.renderToString(
    layout?.Component != null ? (
      <layout.Component config={config} />
    ) : (
      <NotImplemented config={config} />
    ),
  );

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCommonCSS()}
        ${layout?.getCSS != null ? layout.getCSS(config) : ""}
    </style>
    <body>
      ${rendered}
    </body>
</html>`;
};
