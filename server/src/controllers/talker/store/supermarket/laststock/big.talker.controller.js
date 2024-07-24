// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");
const {
  generarPrecio,
  validarTachado,
} = require("../../../funciones.hablador");
const { withIva } = require("../../prices/main");
const { cOut } = require("../../prices/crossedOut");

// Posición
let priceTalkerPositionPriceX = 264.57 - 37.8;
let priceTalkerPositionPriceY = 226.77 - 18.9;

// Fuente
const priceTalkerfontSize = 12;
const priceTalkerFontSizePrice = 72;

// -- Contenido estático
const priceTalkerWidthText = 221;
const priceTalkerFontPath = process.cwd();

var contador = 0;

const habladorUltimasExistenciasG = async (
  dataCallback,
  endCallback,
  priceTalkerData
) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  for (let i = 0; i < priceTalkerData.length; i++) {
    const product = priceTalkerData[i];

    let { precioTachado, priceTalkerPrice, priceTalkerList } = product;

    // AÑADIR NUEVAS PAGINA
    if (contador > 0) {
      doc.addPage({ size: "A4", layout: "landscape" });
      contador = 0;
    }

    let precio = generarPrecio(priceTalkerPrice, priceTalkerList);
    let tachadoIva = generarPrecio(product.precioTachado, priceTalkerList);

    const tachadoCalculado = Math.round(
      cOut(parseFloat(tachadoIva), parseFloat(precio), 0)
    );

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .fillColor("black")
      .text(
        `$${tachadoCalculado}`, // ${precioTachado}
        priceTalkerPositionPriceX,
        priceTalkerPositionPriceY + 11.34
      );

    // PRECIO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(100)
      .text(
        `$${precio}`,
        priceTalkerPositionPriceX + 113.39,
        priceTalkerPositionPriceY + 75.59
      );
    // CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(20)
      .text(
        `${product.priceTalkerSapCode}`,
        priceTalkerPositionPriceX + 113.39 + 151.18,
        priceTalkerPositionPriceY - 18.9,
        {
          width: 283.46,
          align: "center",
        }
      );
    // DESCRIPCION DEL ARTICULO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(20)
      .text(
        `${product.priceTalkerdescription}`,
        priceTalkerPositionPriceX + 113.39 + 151.18,
        priceTalkerPositionPriceY + 30.24 - 18.9,
        {
          width: 283.46,
          align: "center",
        }
      );
    contador++;
  }

  contador = 0;
  doc.end();
};

module.exports = {
  habladorUltimasExistenciasG,
};
