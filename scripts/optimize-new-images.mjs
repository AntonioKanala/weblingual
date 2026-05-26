// Optimize images from "Imágenes Lingual Actualizadas" into /public with proper slugs.
// Converts JPG/PNG → WebP @ q=82, resizes to max 2000px on long edge, applies EXIF rotation.

import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "Imágenes Lingual Actualizadas";

// [sourceFile, destinationPath, options?]
const JOBS = [
  // Hero / Tratamiento / Lifestyle (lifestyle hero shots)
  ["162A1078.jpg", "public/images/lifestyle/box-atencion-paciente.webp"],
  ["162A1179.jpg", "public/images/lifestyle/consulta-mostrando.webp"],
  ["162A1431.jpg", "public/images/lifestyle/paciente-alineador.webp"],
  ["162A1786.jpg", "public/images/lifestyle/brackets-personalizados.webp"], // ⭐ reemplazo "moldes de yeso"
  ["IMG_9089.jpg", "public/images/lifestyle/paciente-riendo-perfil.webp"],
  ["IMG_9110.jpg", "public/images/lifestyle/paciente-alineador-luz.webp"],
  ["IMG_9218.jpg", "public/images/lifestyle/paciente-hombre-riendo.webp"],
  ["IMG_9338.jpg", "public/images/lifestyle/dra-pinkas-atendiendo.webp"],
  ["IMG_9452.jpg", "public/images/lifestyle/paciente-resultado.webp"],
  ["64.jpg", "public/images/lifestyle/lifestyle-sombrero-exterior.webp"],
  ["_MG_0004.jpg", "public/images/instalaciones/box-vista-recepcion.webp"],
  ["_MG_0086.jpg", "public/images/lifestyle/atencion-multidisciplinaria.webp"],

  // Instalaciones (reemplaza los actuales)
  ["Clíncia Lingual.webp", "public/images/instalaciones/sala-espera.webp"],
  ["Clínica Lingual Sala de espera 2.webp", "public/images/instalaciones/sala-espera-atardecer.webp"],
  ["IMG_9299.jpg", "public/images/instalaciones/recepcion.webp"], // Sala de espera vertical → puede usarse como recepción/espera
  ["IMG_9882.JPG", "public/images/instalaciones/box.webp", { rotate: 270 }], // ⚠️ rotar
  ["IMG_9912.JPG", "public/images/instalaciones/presupuestos.webp", { rotate: 270 }], // ⚠️ rotar

  // Beneficios (tratamiento)
  ["Beneficio 4 Ortodoncia Lingual No daña el esmalte frontal de los dientes.webp", "public/images/beneficios/protege-esmalte.webp"],

  // Dentistas (foto pro actualizada)
  ["Dentistas Página web (1).png", "public/images/upload/Jose Kuhn.png"], // reemplaza la actual (mantiene path)
];

async function processOne([src, dest, opts = {}]) {
  const srcPath = path.join(SRC, src);
  if (!existsSync(srcPath)) {
    console.warn(`SKIP (not found): ${srcPath}`);
    return;
  }
  await mkdir(path.dirname(dest), { recursive: true });

  let pipeline = sharp(srcPath).rotate(); // auto-rotate via EXIF
  if (opts.rotate) pipeline = pipeline.rotate(opts.rotate);
  pipeline = pipeline.resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true });

  if (dest.endsWith(".webp")) {
    pipeline = pipeline.webp({ quality: 82, effort: 5 });
  } else if (dest.endsWith(".png")) {
    pipeline = pipeline.png({ quality: 90, compressionLevel: 9 });
  } else if (dest.endsWith(".jpg") || dest.endsWith(".jpeg")) {
    pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
  }

  await pipeline.toFile(dest);
  console.log(`OK  ${src} → ${dest}`);
}

console.log("Optimizing images...");
for (const job of JOBS) {
  try {
    await processOne(job);
  } catch (e) {
    console.error(`FAIL ${job[0]}: ${e.message}`);
  }
}
console.log("Done.");
