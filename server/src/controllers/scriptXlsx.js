// Script para importat los datos al modulo de habladores de precio.

// Importar la libreria que nos va a permitir trabajr con archivos Excel (xlsx)
const xlsx = require("xlsx");
const ruta = "C:/Users/d.marcano/Desktop/price.talker/server/15.xlsx";

let skuCrudo = [];
let sku = [];

const readXlsx = (rutaFile) => {
  const workbook = xlsx.readFile(rutaFile);
  const sheet = workbook.Sheets.Hoja1;

  for (value in sheet) {
    skuCrudo.push(sheet[value].v);
  }
  sku = skuCrudo.filter((code) => code !== undefined);

  const jsonSku = JSON.stringify({
    sku: sku,
  });

  return jsonSku;
};

const start = performance.now();
readXlsx(ruta);
const end = performance.now();

console.log("El tiempo de ejecución de la función factorial es:", end - start);
console.log("Cantidad de codigos sku", sku.length);