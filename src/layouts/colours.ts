export interface ColourTheme {
  fg: string;
  bg: string;
  gray: string;
  pink: string;
}

export const defaultTheme = "Dark";

export const colourThemes: Record<string, ColourTheme> = {
  light: {
    fg: "#111827",
    bg: "#ffffff",
    gray: "9CA3AF",
    pink: "#EC4899",
  },
  dark: {
    fg: "#F3F4F6",
    bg: "#111827",
    gray: "#6B7280",
    pink: "#EC4899",
  },
};
