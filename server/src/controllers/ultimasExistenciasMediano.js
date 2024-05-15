// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;

// NUEVAS VARIABLES PARA EL LAYOUT DE HABLADORES
/* NOTA: LA LETRA (P) AL FINAL DEL CADA VARIABLE INDICA EN ESPAÑOL 
LA FRASE POSICIÓN */
const n1cm = 37.8; // REPRESENTACION APROXIMADA DE 1CM CUADRADO EN EL PDF

let precioTachadoP = { x: n1cm * 4.49, y: n1cm * 4.39 };
let precioFullP = { X: n1cm * 5.9, Y: n1cm * 5.9 };
let codigoSap = { x: n1cm * 8.2, y: n1cm * 3.4 };
let descripcion = {x: n1cm * 8.4, y: n1cm * 4.1 };

// Fuente
const priceTalkerfontSize = 18;
const priceTalkerFontSizePrice = 50;
const priceTalkerFontSizePriceNew = 80;

// -- Contenido estático
const priceTalkerWidthText = n1cm * 6;
const priceTalkerFontPath = process.cwd();

const habladorUltimasM = async (dataCallback, endCallback, priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "portrait" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  for (let i = 0; i < priceTalkerData.length; i++) {
    const product = priceTalkerData[i];

    let precio = parseFloat(product.priceTalkerPrice);
    let precioTachado;
    precioTachado = Math.trunc(precio);
    // AJUSTAR EL TACHADO YA QUE ESTE PRECIO VIENE EN 0
    precio = Math.round(precio - 5) - 0.01;
    const stringPrecio = precio.toString();
    const regexPunto = /\./g;
    precio = stringPrecio.replace(regexPunto, ",");

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .text(`$${precioTachado}`, precioTachadoP.x, precioTachadoP.y);
    // PRECIO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePriceNew)
      .text(`$${precio}`, precioFullP.X, precioFullP.Y);
    // CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerfontSize)
      .text(`${product.priceTalkerSapCode}`, codigoSap.x, codigoSap.y, {
        width: priceTalkerWidthText,
        align: "center",
      });
    // DESCRIPCION DEL ARTICULO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerfontSize)
      .text(`${product.priceTalkerdescription}`, descripcion.x, descripcion.y, {
        width: priceTalkerWidthText,
        align: "center",
      });
  }

  doc.end();
};

module.exports = {
  habladorUltimasM,
};
