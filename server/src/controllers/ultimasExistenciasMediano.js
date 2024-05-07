// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pathLogo = require("../img/index");
const bwipjs = require("bwip-js");
const moment = require("moment-timezone");

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
const { log } = require("console");
var logoName = "PRUEBA.png";

// -- VARIABLES --

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;

// Posición
let boxPositionX = 0;
let boxPositionY = 0;
let priceTalkerDescriptionPositionX = 0;
let priceTalkerDescriptionPositionY = 49; // Ajustado
let priceTalkerBrandPositionX = 51.5; // Ajustado
let priceTalkerBrandPositionY = 40.5; // Ajustado
let priceTalkerPositionPriceX = 132.285 - 18.9; // Ajustado
let priceTalkerPositionPriceY = 113.385 - 9.45; // Ajustado
let priceTalkerLogoPositionX = 169.5; // Ajustado
let priceTalkerLogoPositionY = 42; // Ajustado
let priceTalkerCodeSapX = 106; // Ajustado
let priceTalkerCodeSapY = 81.5; // Ajustado
let priceTalkerPositionWarrantyX = 49; // Ajustado
let priceTalkerPositionWarrantyY = 117; // Ajustado
let priceTalkerBarCodeX = 135; // Ajustado
let priceTalkerBarCodeY = 90; // Ajustado

// Tamaño
const boxWith = 1056.0 / 2; // Ajustado
const boxHeight = 816.38 / 2; // Ajustado
let priceTalkerBarCodeWith = 49.5; // Ajustado
let priceTalkerBarCodeHeight = 14; // Ajustado
let priceTalkerLogoWith = 24; // Ajustado
let priceTalkerLogoHeight = 21.5; // Ajustado

// Fuente
const priceTalkerfontSize = 20; // Ajustado
const priceTalkerFontSizePrice = 50; // Ajustado
const priceTalkerFontSizePriceNew = 80; // Ajustado

// -- Contenido estático
const priceTalkerWidthText = 110.5; // Ajustado
const priceTalkerFontPath = process.cwd();

// Controlador de flujo para la generación de habladores
let contador = 0;

const habladorUltimasM = async (dataCallback, endCallback, priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "portrait" }); // Ajustado

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
      .text(
        `$${precioTachado}`,
        priceTalkerPositionPriceX + 18.90,
        priceTalkerPositionPriceY + 5.67 + 75.59 - 18.90 // Ajustado
      );
    // PRECIO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePriceNew) // Ajustado
      .text(
        `$${precio}`,
        priceTalkerPositionPriceX + 56.695 + 37.80, // Ajustado fala 1cm
        priceTalkerPositionPriceY + 37.795 + 75.59 // Ajustado + 4cm
      );
    // CODIGO SAP
    // doc
    //   .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
    //   .fontSize(priceTalkerfontSize) // Ajustado
    //   .text(
    //     `${product.priceTalkerSapCode}`,
    //     priceTalkerPositionPriceX + 56.695 + 75.59, // Ajustado
    //     priceTalkerPositionPriceY - 9.45, // Ajustado
    //     {
    //       width: 141.73, // Ajustado
    //       align: "center",
    //     }
    //   );
    // DESCRIPCION DEL ARTICULO
    // doc
    //   .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
    //   .fontSize(priceTalkerfontSize) // Ajustado
    //   .text(
    //     `${product.priceTalkerdescription}`,
    //     priceTalkerPositionPriceX + 56.695 + 75.59, // Ajustado
    //     priceTalkerPositionPriceY + 15.12 - 9.45, // Ajustado
    //     {
    //       width: 141.73, // Ajustado
    //       align: "center",
    //     }
    //   );
  }

  doc.end();
};

module.exports = {
  habladorUltimasM,
};
