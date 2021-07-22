import { NextApiHandler } from "next";
import { parseRequest } from "./_lib/parser";
import { getHtml } from "./_lib/template";

const handler: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    console.log("\n\n--- /api/html");
    console.log("CONFIG", config);

    const html = getHtml(config);
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
