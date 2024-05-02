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
let priceTalkerPositionPriceY = 219.21;
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

const habladorPromoG = async (dataCallback, endCallback, priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Recorres cada dato
  priceTalkerData.forEach((dato) => {
    // CABECERA DEL PRODUCTO (PRODUCTO A IMPULSAR)

    // CODIGO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(18)
      .text(
        `${dato.product.Codigo}`,
        priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46,
        priceTalkerPositionPriceY + 10 - 18.9,
        {
          width: 283.46,
          align: "center",
        }
      );

    // DESCRIPCION PRIMER ARTICULO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(18)
      .text(
        `${dato.product.Nombre}`,
        priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46,
        priceTalkerPositionPriceY + 30 + 10 - 18.9,
        {
          width: 283.46,
          height: 70,
          align: "center",
        }
      );

    // SIMBOLO DE SEPARACION (+)
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(18)
      .text(
        "+",
        priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46,
        priceTalkerPositionPriceY + 30 + 10 - 18.9 + 15.12 + 15.12 + 15.12,
        {
          width: 283.46,
          align: "center",
        }
      );

    // DETALLE DEL PRODUCTO (PRODUCTO RELACIONADO)

    // CODIGO DEL DETALLE
    let yOffset = 0; // Este será nuestro desplazamiento en el eje y
    let vuelta = 0;
    dato.details.forEach((detail, index) => {
      console.log(`Detalle ${index + 1}: ${detail.Codigo}`);
      // DESCRIPCION SEGUNDO ARTICULO
      if (vuelta === 0) {
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(18)
          .text(
            `${detail.Nombre}`,
            priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46,
            priceTalkerPositionPriceY + 30 + 10 - 18.9 + 30.24 + 30.24,
            {
              width: 283.46,
              height: 70,
              align: "center",
            }
          );
        vuelta++;
      } else {
        console.log("solo tomammos el primer articulo..");
      }
      // CODIGOS RELACIONADOS
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(18)
        .text(
          `${detail.Codigo}/`,
          priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46 + yOffset,
          priceTalkerPositionPriceY + 110 + 10 - 18.9 + 30.24,
          {
            width: 283.46,
            align: "left",
          }
        );
      yOffset += 150; // Incrementamos el desplazamiento para el siguiente detalle
    });

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .text(
        `$${dato.product.PrecioTachado}`,
        priceTalkerPositionPriceX,
        priceTalkerPositionPriceY + 11.34 + 37.8
      );

    console.log(dato.product);
    // PRECIO
    if (dato.product["Lista Precio"] != "3") {
      // CON .99

      // SI LA LISTA ES MARGARITA NO LLEVA IVA
      if (dato.product["Lista Precio"] != "1") {
        // CUALQUIER OTRA LISTA
        // console.log("ss");
        // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
        if (dato.product.PrecioaMostrar < 1) {
          // 0 0,1 0,12123 etc
          precio = parseFloat(dato.product.PrecioaMostrar);
          precio = precio.toString().replace(".", ",");
          precio = Math.round(precio);
        } else {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(dato.product.PrecioaMostrar * 1.16);
          precio = Math.round(precio);
          precio = precio - 0.01;
          precio = precio.toString().replace(".", ",");
          // console.log(precio);
        }
        //
        //
      } else {
        precio = Math.round(precio);
        // LISTA PARA MARGARITA
        // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
        if (dato.product.PrecioaMostrar < 1) {
          // 0 0,1 0,12123 etc
          precio = parseFloat(dato.product.PrecioaMostrar);
          precio = precio.toString().replace(".", ",");
        } else {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(dato.product.PrecioaMostrar);
          precio = Math.round(precio);
          precio = precio - 0.01;
          precio = precio.toString().replace(".", ",");
        }
        //
      }
      // FIN DEL BLOQUE DE CODIGO

      // PRECIO
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(100)
        .text(
          `$${precio}`,
          priceTalkerPositionPriceX + 113.39,
          priceTalkerPositionPriceY + 75.59 + 60
        );
    } else {
      // ENTERO
      // SI LA LISTA ES MARGARITA NO LLEVA IVA
      if (product.priceTalkerList != "1") {
        // CUALQUIER OTRA LISTA
        precio = parseFloat(dato.product.PrecioaMostrar * 1.16);
        precio = Math.round(precio);
      } else {
        // LISTA PARA MARGARITA
        precio = parseFloat(dato.product.PrecioaMostrar);
        precio = Math.round(precio);
      }
      // FIN DEL BLOQUE DE CODIGO
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(100)
        .text(
          `$${precio}`,
          priceTalkerPositionPriceX + 113.39,
          priceTalkerPositionPriceY + 75.59 + 60
        );
    }
  });

  vuelta = 0;
  doc.end();
};

module.exports = {
  habladorPromoG,
};
