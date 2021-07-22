import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { colourThemes, defaultTheme } from "./colours";
import { getTheme, Logo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return `
  .top {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    background-color: ${colours.bg};
    color: ${colours.fg};
    padding: 80px;
  }

    .logo {
      position: absolute;
      top: 60px;
      left: 60px;
    }

    h1 {
      margin: 0;
      text-align: right;
      font-size: 1.5em;
      font-weight: 800;
      max-width: 1500px;
    }

    .dicon-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 80px;
    }

    .dicon {
      width: 256px;
      height: 256px;
      border-radius: 2px;
    }

    .em {
      color: ${colours.pink};
    }

    .url {
      margin-top: 48px;
      text-align: right;
      font-size: 48px;
      font-family: "JetBrains Mono", monospace;
      color: ${colours.gray};
    }
    `;
};

const Component: LayoutComponent = ({ config }) => {
  const theme = getTheme(config);
  const name = config.Name;
  const url = config.URL;
  const iconURL = `https://devicons.railway.app/${name}?variant=${
    theme === "light" ? "dark" : "light"
  }`;
  const hideIcon = config.Icon === "Hide";

  console.log({ iconURL });

  return (
    <div className="top">
      <Logo config={config} />

      <div className="content">
        {!hideIcon && (
          <div className="dicon-wrapper">
            <img className="dicon" src={iconURL} />
          </div>
        )}

        <h1>
          Check out <span className="em">{name}</span> on Nest
        </h1>

        {url && <div className="url">{url}</div>}
      </div>
    </div>
  );
};

export const featuredLayout: ILayout = {
  name: "Featured",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Name",
      type: "text",
      default: "Prisma",
      placeholder: "Module name",
    },
    {
      name: "URL",
      type: "text",
      default: "nest.land/-/prisma",
      placeholder: "Module URL",
    },
    {
      name: "Icon",
      type: "select",
      options: ["Show", "Hide"],
      default: "Show",
    },
  ],
  getCSS,
  Component,
};
