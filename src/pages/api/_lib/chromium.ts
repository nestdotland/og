import core from "puppeteer";
import { OG_HEIGHT, OG_WIDTH } from "../../../constants";
import { FileType } from "../../../types";
import { getOptions } from "./options";
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  html: string,
  type: FileType,
  isDev: boolean,
) {
  const page = await getPage(isDev);
  await page.setViewport({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
}
