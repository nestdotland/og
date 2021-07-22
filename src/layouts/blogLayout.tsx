import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { authors } from "./authors";
import { colourThemes, defaultTheme } from "./colours";
import { AuthorImage, getTheme, Markdown, Logo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return `
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }

    h1 {
      font-size: 100px;
      margin: 75px 0;
    }

    h2 {
      font-size: 50px;
      margin-top: 25px;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const title = config.Title;
  const author = config.Author;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo config={config} style={{ height: 150, width: 150 }} />
      <h1>
        <Markdown>{title}</Markdown>
      </h1>

      <AuthorImage name={author} />
      <h2 style={{ display: "flex" }}>
        <Markdown style={{ fontWeight: 400 }}>by&nbsp;</Markdown>
        <Markdown>{author}</Markdown>
      </h2>
    </div>
  );
};

export const blogLayout: ILayout = {
  name: "Blog",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Title",
      type: "text",
      default: "Nest Module Registry",
      placeholder: "Title Text",
    },
    {
      name: "Author",
      type: "select",
      default: authors[0].name,
      options: authors.map(author => author.name),
    },
  ],
  getCSS,
  Component,
};
