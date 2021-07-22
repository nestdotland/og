import chrome from "chrome-aws-lambda";

interface Options {
  args?: string[];
  executablePath?: string;
  headless?: boolean;
}

export async function getOptions(isDev: boolean): Promise<Options> {
  if (isDev) {
    console.log("[i] Using puppeteer chrome");
    return {
      headless: true,
    };
  } else {
    console.log("[i] Using chrome-aws-lambda");
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
}
