// Based on https://dev.to/rbt/sveltekit-sitemap-b00
import glob = require("tiny-glob");
import { create } from "xmlbuilder2";
import * as fs from "fs";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

/**
 * @param {string} websiteUrl
 * @param {any} builder
 * @param {string} pagesDirectory
 */
async function generateSitemap(
  websiteUrl: string,
  builder: any,
  pagesDirectory = "build"
) {
  builder.log("Starting generation of sitemap");
  const sitemap = create({ version: "1.0" }).ele("urlset", {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
  });

  const pages = await glob("**/*.{html,html.gz}", {
    cwd: pagesDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  await Promise.all(
    pages.map((page: string) =>
      Promise.all([
        addElementToSitemap(builder, page, sitemap, websiteUrl, pagesDirectory),
      ])
    )
  );

  const xml = sitemap.end({ prettyPrint: true });

  fs.writeFileSync(`${pagesDirectory}/sitemap.xml`, xml);

  builder.log("Done generating svdvdvitemap");
}

/**
 * @param {any} builder
 * @param {string} pagePath
 * @param {XMLBuilder} sitemap
 * @param {string} websiteUrl
 * @param {string} pagesDirectory
 */

async function addElementToSitemap(
  builder: any,
  pagePath: string,
  sitemap: XMLBuilder,
  websiteUrl: string,
  pagesDirectory: string
) {
  const url = sitemap.ele("url");
  builder.log(`Page path: ${pagePath}`);
  const trimmedPagePath = pagePath
    .substring(pagePath.lastIndexOf(pagesDirectory) + pagesDirectory.length)
    .replace("index.html", "");
  builder.log(`Trimmed page path: ${trimmedPagePath}`);
  url.ele("loc").txt(`${websiteUrl}${trimmedPagePath}`);
  url.ele("changefreq").txt("weekly");
}

module.exports = generateSitemap;
