import glob = require("tiny-glob");
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

/**
 * @param {string} assetsDirectory
 */
export const convert_webp = async (assetsDirectory: string) => {
  const files = await glob("**/*.{jpg,jpeg,png}", {
    cwd: assetsDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  await Promise.all(
    files.map((file: string) => Promise.all([convert_webp_file(file)]))
  );
};

/**
 * @param {string} file
 */
async function convert_webp_file(file: string) {
  const buildImagePathArray = file.split("/");
  const fileName = buildImagePathArray[buildImagePathArray.length - 1];
  const newAssetPath = file.replace(fileName, "");
  await imagemin([file], {
    destination: newAssetPath,
    plugins: [imageminWebp({})],
  });
}
