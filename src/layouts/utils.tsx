import twemoji from "twemoji";
import marked from "marked";
import { ILayoutConfig } from "../types";
import React from "react";
import { defaultTheme } from "./colours";
import { sanitizeHtml } from "../pages/api/_lib/sanitizer";
import { getAuthor } from "./authors";

export const emojify = (text: string): string =>
  twemoji.parse(text, {
    folder: "svg",
    ext: ".svg",
  });

export const mdToHTML = (text: string): string => marked(text);

export const gString = (
  layoutConfig: ILayoutConfig,
  name: string,
  defaultValue: string = "",
): string => {
  const value = layoutConfig[name] ?? defaultValue;
  return Array.isArray(value) ? value.join(", ") : value;
};

export const getTheme = (config: ILayoutConfig) => {
  return (config.Theme ?? defaultTheme).toLowerCase();
};

export const Emoji: React.FC<{ children: string; className?: string }> = ({
  children,
  ...props
}) => (
  <div
    className={`emoji ${props.className}`}
    dangerouslySetInnerHTML={{ __html: emojify(children) }}
  />
);

export const Markdown: React.FC<{
  children: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, style, ...props }) => (
  <div
    className={props.className}
    dangerouslySetInnerHTML={{
      __html: emojify(marked(sanitizeHtml(children))),
    }}
    style={style}
  />
);

export const Logo: React.FC<{
  config: ILayoutConfig;
  style?: React.CSSProperties;
}> = ({ config, style }) => {
  // const theme = gString(config, "Theme", defaultTheme).toLowerCase();
  const logo = "https://og.nest.land/logo/512px.png";

  return (
    <img
      src={logo}
      className="logo"
      style={{ width: 128, height: 128, ...style }}
    />
  );
};

export const AuthorImage: React.FC<{
  name: string;
  style?: React.CSSProperties;
}> = ({ name, style }) => {
  const author = getAuthor(name);
  return (
    <img
      src={author.image}
      alt={author.name}
      style={{ borderRadius: "100%", width: 100, height: 100, ...style }}
    />
  );
};
