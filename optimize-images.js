import sharp from "sharp";
import { glob } from "glob";

const files = await glob("src/assets/**/*.{png,jpg,jpeg}");

for (const file of files) {
  const out = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  // Las capturas "fullscreen/fullpage"las tratamos distinto: menos resize, un poco más de calidad
  const isFullpage = /fullscreen|fullpage/i.test(file);

  await sharp(file)
    .resize({
      width: isFullpage ? 1920 : 1600,
      withoutEnlargement: true,
    })
    .webp({ quality: isFullpage ? 82 : 78 })
    .toFile(out);

  console.log(`✓ ${file} -> ${out}`);
}
