import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function removeBackground(input, output, mode) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (mode === "white" && r > 235 && g > 235 && b > 235) {
      data[i + 3] = 0;
    }
    if (mode === "black" && r < 25 && g < 25 && b < 25) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log(`Created ${path.basename(output)}`);
}

await removeBackground(
  path.join(__dirname, "../public/logo.png"),
  path.join(__dirname, "../public/logo-clear.png"),
  "white"
);

await removeBackground(
  path.join(__dirname, "../public/logo-white.png"),
  path.join(__dirname, "../public/logo-white-clear.png"),
  "black"
);
