import { glob } from "glob";
import fs from "fs";

const imageFiles = await glob("src/assets/**/*.{png,jpg,jpeg}");
let deleted = 0;

for (const imgFile of imageFiles) {
  const webpFile = imgFile.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  if (fs.existsSync(webpFile)) {
    fs.unlinkSync(imgFile);
    deleted++;
    console.log(`🗑 eliminado: ${imgFile}`);
  }
}

console.log(`\nListo. ${deleted} archivos originales eliminados.`);
