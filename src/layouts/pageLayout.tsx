import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { colourThemes, defaultTheme } from "./colours";
import { getTheme, Markdown, Logo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return `
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }

    h1 {
      margin-top: 120px;
      font-size: 160px;
    }

    h2 {
      margin-top: 120px;
      font-size: 60px;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const title = config.Title;
  const subTitle = config["Subtitle"];

  const logoSize = !!subTitle ? 150 : 240;

  return (
    <div>
      <Logo config={config} style={{ width: logoSize, height: logoSize }} />
      <h1>
        <Markdown>{title}</Markdown>
      </h1>

      {subTitle && (
        <h2>
          <Markdown>{subTitle}</Markdown>
        </h2>
      )}
    </div>
  );
};

export const pageLayout: ILayout = {
  name: "Page",
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
      default: "Explore Modules",
      placeholder: "Big text",
    },
    {
      name: "Subtitle",
      type: "text",
      default: "This is a subtitle text",
      placeholder: "Subtitle text",
    },
  ],
  getCSS,
  Component,
};
