import { glob } from "glob";
import fs from "fs";
import path from "path";

const imageFiles = await glob("src/assets/**/*.{png,jpg,jpeg}");
const sourceFiles = await glob("src/**/*.{js,jsx,ts,tsx,vue,html}", {
  ignore: "src/assets/**",
});

let totalReplacements = 0;

for (const imgFile of imageFiles) {
  const webpFile = imgFile.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  if (!fs.existsSync(webpFile)) continue; // no se convirtió, la salteamos

  const oldName = path.basename(imgFile);
  const newName = path.basename(webpFile);

  for (const srcFile of sourceFiles) {
    let content = fs.readFileSync(srcFile, "utf-8");
    if (content.includes(oldName)) {
      content = content.split(oldName).join(newName);
      fs.writeFileSync(srcFile, content, "utf-8");
      totalReplacements++;
      console.log(`✓ ${srcFile}: ${oldName} -> ${newName}`);
    }
  }
}

console.log(`\nListo. ${totalReplacements} referencias actualizadas.`);
