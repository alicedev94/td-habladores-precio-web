// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");

// FUNCIONES
const { generarPrecio } = require("../controllers/funciones.hablador");

// NUEVAS VARIABLES PARA EL LAYOUT DE HABLADORES
/* NOTA: LA LETRA (P) AL FINAL DEL CADA VARIABLE INDICA EN ESPAÑOL 
LA FRASE POSICIÓN */
const n1cm = 37.8; // REPRESENTACION APROXIMADA DE 1CM CUADRADO EN EL PDF

let precioTachadoP = { x: (n1cm * 13.5), y: (n1cm * 7.9)};
let codigoSap = { x: (n1cm * 16.8), y: (n1cm * 7.4)};
let descripcion = { x: (n1cm * 16.8), y: (n1cm * 7.8)};
let garantiaP = { x: (n1cm * 16.8), y: (n1cm * 8.4)};
let precioFullP = { X: (n1cm * 14.5), Y: (n1cm * 8.8)};

let altura = n1cm * 1.5;

// Fuente
const priceTalkerfontSize = 16 / 2;
const priceTalkerFontSizePrice = 50 / 2;
const priceTalkerFontSizePriceNew = 80 / 2;

// -- Contenido estático
const priceTalkerWidthText = (n1cm * 7) / 2;
const priceTalkerFontPath = process.cwd();

const PromoDakaP = async (dataCallback, endCallback, datos) => {
  datos.forEach((dato, index) => {
    if (index != 0) {
      // CUALQUIER HABLADOR DE SUPERMERCADO SE PUEDE SACAR SOLO (1) UNO A A LA VEZ.
      return;
    } else {
      // GENERADO Y DESCARGA DEL FORMATO PDF
      let { Codigo, Nombre, PrecioaMostrar, PrecioTachado, Garantia } =
        dato.product;

      const doc = new PDFDocument({ size: "A4", layout: "landscape" });

      doc.on("data", dataCallback);
      doc.on("end", endCallback);

      for (let i = 0; i < datos.length; i++) {
        const precio = generarPrecio(
          PrecioaMostrar,
          dato.product["Lista Precio"]
        );

        // PRECIO TACHADO
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(priceTalkerFontSizePrice)
          .text(`$${PrecioTachado}`, precioTachadoP.x, precioTachadoP.y);
        // PRECIO
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(priceTalkerFontSizePriceNew)
          .text(`$${precio}`, precioFullP.X, precioFullP.Y);
        // CODIGO SAP
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(priceTalkerfontSize)
          .text(`${Codigo}`, codigoSap.x, codigoSap.y, {
            width: priceTalkerWidthText,
            align: "center",
          });
        // DESCRIPCION DEL ARTICULO
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(priceTalkerfontSize)
          .text(`${Nombre}`, descripcion.x, descripcion.y, {
            width: priceTalkerWidthText,
            height: altura,
            align: "center",
          });
        // GARANTIA
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(priceTalkerfontSize)
          .text(
            `Tiempo de Garantía de ${Garantia} Días`,
            garantiaP.x,
            garantiaP.y,
            {
              width: priceTalkerWidthText,
              height: altura,
              align: "center",
            }
          );
      }

      doc.end();
    }
  });
};

module.exports = {
  PromoDakaP,
};
