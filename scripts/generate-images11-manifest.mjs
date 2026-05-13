import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const folder = "11";
const imageRoot = path.join(root, "public", "images", folder);
const output = path.join(imageRoot, "images.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]);

function toUrl(relativePath) {
  return `/images/${folder}/${relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

async function collectImages(directory, images = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectImages(absolutePath, images);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!imageExtensions.has(extension)) continue;

    const relativePath = path.relative(imageRoot, absolutePath).split(path.sep).join("/");
    if (relativePath === "images.json") continue;

    const metadata = await stat(absolutePath);
    images.push({
      filename: entry.name,
      path: relativePath,
      url: toUrl(relativePath),
      extension: extension.slice(1),
      size: metadata.size,
    });
  }

  return images;
}

const images = (await collectImages(imageRoot)).sort((a, b) =>
  a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: "base" })
);

await writeFile(
  output,
  `${JSON.stringify({ folder, count: images.length, images }, null, 2)}\n`,
  "utf8"
);

console.log(`Generated ${path.relative(root, output)} with ${images.length} images.`);
