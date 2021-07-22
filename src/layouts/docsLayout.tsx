import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { defaultTheme, colourThemes } from "./colours";
import { gString, Markdown, Logo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = gString(config, "Theme", defaultTheme).toLowerCase();
  const colours = colourThemes[theme];

  return `
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const theme = gString(config, "Theme", defaultTheme).toLowerCase();
  const colours = colourThemes[theme];

  const page = gString(config, "Page");
  const url = gString(config, "URL");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100vw",
        height: "100vh",
        padding: 80,
      }}
    >
      <Logo
        config={config}
        style={{
          position: "absolute",
          top: 60,
          left: 60,
        }}
      />

      <h1 style={{ fontSize: 200, fontWeight: 800 }}>Nest Docs</h1>

      <Markdown
        style={{
          fontSize: 160,
          color: colours.pink,
          fontWeight: 800,
          marginTop: 20,
        }}
      >
        {page}
      </Markdown>

      {url && (
        <div
          style={{
            marginTop: 48,
            textAlign: "right",
            fontSize: 48,
            fontFamily: `"JetBrains Mono", monospace`,
            color: colours.gray,
          }}
        >
          {url}
        </div>
      )}
    </div>
  );
};

export const docsLayout: ILayout = {
  name: "Docs",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Page",
      type: "text",
      default: "Introduction",
      placeholder: "Page title",
    },
    {
      name: "URL",
      type: "text",
      default: "docs.nest.land/introduction",
      placeholder: "docs.nest.land/introduction",
    },
  ],
  getCSS,
  Component,
};
