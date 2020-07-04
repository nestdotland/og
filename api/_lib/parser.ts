import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { fontSize, images, theme, md } = query || {};
  var fontSizeOverride = "";

  var packageUrl: boolean = false;

  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }
  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  if (
    req.headers.referer != undefined &&
    req.headers.referer.includes("https://nest.land/package/")
  ) {
    var packageUrl = true;
    text = req.headers.referer.replace("https://nest.land/package/", "");
    fontSizeOverride = "250px";
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    theme: theme === "dark" ? "dark" : "light",
    md: packageUrl === false && (md === "1" || md === "true"),
    fontSize: fontSizeOverride == "" ? fontSize || "100px" : fontSizeOverride,
    images: getArray(images),
  };
  parsedRequest.images = getDefaultImages(
    parsedRequest.images,
    parsedRequest.theme
  );
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  const defaultImage =
    theme === "light"
      ? "https://nest.land/images/nest.land/logo_light.svg"
      : "https://nest.land/images/nest.land/logo_dark.svg";

  if (!images || !images[0]) {
    return [defaultImage];
  }
  if (
    !images[0].startsWith("https://assets.vercel.com/") &&
    !images[0].startsWith("https://nest.land/") &&
    !images[0].startsWith("https://cdn.maximousblk.now.sh/")
  ) {
    images[0] = defaultImage;
  }
  if (images[0] == "nestDefault") {
    images[0] = defaultImage;
  }
  return images;
}
