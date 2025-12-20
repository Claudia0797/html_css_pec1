const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Carpeta donde están tus imágenes originales
const inputDir = path.join(__dirname, "../assets/img");
// Carpeta donde se guardarán las imágenes optimizadas
const outputDir = path.join(__dirname, "../assets/img-optimizadas");

// Tamaños para responsive
const sizes = [400, 800, 1200];

// Formatos a generar
const formats = ["webp", "jpeg", "avif"];

// Crear carpeta de destino si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para optimizar y generar varias versiones
function optimizeImage(fileName) {
  const inputPath = path.join(inputDir, fileName);

  sizes.forEach((width) => {
    const ext = path.extname(fileName);
    const name = path.basename(fileName, ext);

    formats.forEach((format) => {
      const outputFileName = `${name}-${width}.${format}`;
      const outputPath = path.join(outputDir, outputFileName);

      sharp(inputPath)
        .resize({ width })
        .toFormat(format, { quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`Generada: ${outputFileName}`))
        .catch((err) => console.error(`Error con ${fileName}:`, err));
    });
  });
}

// Leer todas las imágenes de la carpeta
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error leyendo la carpeta:", err);
    return;
  }

  const images = files.filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file));

  if (images.length === 0) {
    console.log("No se encontraron imágenes en la carpeta.");
    return;
  }

  images.forEach(optimizeImage);
});
