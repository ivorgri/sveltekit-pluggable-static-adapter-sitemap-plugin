// Based on https://dev.to/rbt/sveltekit-sitemap-b00
import glob = require("tiny-glob");
import { create } from "xmlbuilder2";
import * as fs from "fs";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

/**
 * @param {string} pagesDirectory
 * @param {string} pagesDirectory
 */
export const generateSitemap = async (
  pagesDirectory: string,
  websiteUrl: string
) => {
  const sitemap = create({ version: "1.0" }).ele("urlset", {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
  });

  const pages = await glob("**/*.html", {
    cwd: pagesDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  await Promise.all(
    pages.map((page: string) =>
      Promise.all([addElementToSitemap(page, sitemap, websiteUrl)])
    )
  );

  const xml = sitemap.end({ prettyPrint: true });

  fs.writeFileSync("build/sitemap.xml", xml);
};

/**
 * @param {string} pagePath
 * @param {XMLBuilder} sitemap
 * @param {string} websiteUrl
 */

async function addElementToSitemap(
  pagePath: string,
  sitemap: XMLBuilder,
  websiteUrl: string
) {
  const url = sitemap.ele("url");
  const trimmedPagePath = pagePath.slice(6).replace("index.html", "");
  url.ele("loc").txt(`${websiteUrl}/${trimmedPagePath}`);
  url.ele("changefreq").txt("weekly");
}
