const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputImage = path.join(__dirname, "../assets/img/florencia-1.jpg");

const outputDir = path.join(__dirname, "../assets/img-opt-direccion-arte");

// Crear carpeta destino
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const formats = ["avif", "webp", "jpg"];

// Configuración por dispositivo
const variants = [
  {
    name: "mobile",
    width: 480,
    height: 700,
  },
  {
    name: "tablet",
    width: 800,
    height: 600,
  },
  {
    name: "desktop",
    width: 1200,
    height: 700,
  },
];

variants.forEach((variant) => {
  formats.forEach((format) => {
    sharp(inputImage)
      .resize(variant.width, variant.height, {
        fit: "cover",
        position: "centre",
      })
      .toFormat(format, { quality: 80 })
      .toFile(path.join(outputDir, `florencia-1-${variant.name}.${format}`))
      .then(() =>
        console.log(`✔ Generada florencia-1-${variant.name}.${format}`)
      )
      .catch((err) => console.error(err));
  });
});
