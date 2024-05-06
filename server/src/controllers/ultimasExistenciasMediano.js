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
let priceTalkerDescriptionPositionY = 98;
let priceTalkerBrandPositionX = 103;
let priceTalkerBrandPositionY = 81;
let priceTalkerPositionPriceX = 264.57 - 37.8;
let priceTalkerPositionPriceY = 226.77 - 18.9;
let priceTalkerLogoPositionX = 339;
let priceTalkerLogoPositionY = 84;
let priceTalkerCodeSapX = 212;
let priceTalkerCodeSapY = 163;
let priceTalkerPositionWarrantyX = 98;
let priceTalkerPositionWarrantyY = 234;
let priceTalkerBarCodeX = 270;
let priceTalkerBarCodeY = 180;

// Tamaño
const boxWith = 1056.0;
const boxHeight = 816.38;
let priceTalkerBarCodeWith = 99;
let priceTalkerBarCodeHeight = 28;
let priceTalkerLogoWith = 48;
let priceTalkerLogoHeight = 43;

// Fuente
const priceTalkerfontSize = 12;
const priceTalkerFontSizePrice = 72;

// -- Contenido estático
const priceTalkerWidthText = 221;
const priceTalkerFontPath = process.cwd();

// Controlador de flujo para la generación de habladores
let contador = 0;

const habladorUltimasM = async (
  dataCallback,
  endCallback,
  priceTalkerData
) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

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
        priceTalkerPositionPriceY - 18.90,
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
        priceTalkerPositionPriceY + 30.24 - 18.90,
        {
          width: 283.46,
          align: "center",
        }
      );
  }

  doc.end();
};

module.exports = {
    habladorUltimasM,
};
