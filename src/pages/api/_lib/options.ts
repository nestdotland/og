import chrome from "chrome-aws-lambda";

interface Options {
  args?: string[];
  executablePath?: string;
  headless?: boolean;
}

export async function getOptions(isDev: boolean): Promise<Options> {
  if (isDev) {
    return {
      headless: true,
    };
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
}
