// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");

// FUNCIONES
const {
  generarPrecio,
  validarTachado,
} = require("../controllers/funciones.hablador");

// NUEVAS VARIABLES PARA EL LAYOUT DE HABLADORES
/* NOTA: LA LETRA (P) AL FINAL DEL CADA VARIABLE INDICA EN ESPAÑOL 
LA FRASE POSICIÓN */
const n1cm = 37.8; // REPRESENTACION APROXIMADA DE 1CM CUADRADO EN EL PDF

let precioTachadoP = { x: n1cm * 4.49, y: n1cm * 4.39 };
let precioFullP = { X: n1cm * 5.9, Y: n1cm * 5.9 };
let codigoSap = { x: n1cm * 8.4, y: n1cm * 3.9 };
let descripcion = { x: n1cm * 8.4, y: n1cm * 4.6 };
let garantiaP = { x: n1cm * 8.4, y: n1cm * 5.8 };
let altura = n1cm * 1.5;

// Fuente
const priceTalkerfontSize = 16;
const priceTalkerFontSizePrice = 50;
const priceTalkerFontSizePriceNew = 80;

// -- Contenido estático
const priceTalkerWidthText = n1cm * 7;
const priceTalkerFontPath = process.cwd();

const PromoDakaM = async (dataCallback, endCallback, datos, list) => {
  // GENERADO Y DESCARGA DEL FORMATO PDF
  const doc = new PDFDocument({ size: "A4", layout: "portrait" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  datos.forEach((dato, index) => {
    let { Codigo, Nombre, PrecioaMostrar, PrecioTachado, Garantia } =
      dato;

    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
    }

    var rtaPrecio = validarTachado(PrecioTachado, PrecioaMostrar);

    if (PrecioaMostrar < 1) {
      rtaPrecio = 1;
      var precio = PrecioaMostrar;
      precio = precio.toString();
      precio = precio.replace('.', ',');
    } else {
      var precio = generarPrecio(PrecioaMostrar, list);
    }
    // 1 ES UN ERROR Y 0 SIGMNIFICA QUE PROCEDE
    if (rtaPrecio != 0) {
      // ERROR PRECIO TACHADO
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(7.5)
        .fillColor("red")
        .text(
          "El precio tachado no es, al menos, $5 menor que el precio de venta.", // ${precioTachado}
          precioTachadoP.x,
          precioTachadoP.y - n1cm
        );
    }

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .fillColor("black")
      .text(`$${PrecioTachado}`, precioTachadoP.x, precioTachadoP.y);
    // PRECIO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePriceNew)
      .text(`$${precio}`, precioFullP.X, precioFullP.Y, {
        width: priceTalkerWidthText + (n1cm * 5),
      });
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
  });

  doc.end();
};

module.exports = {
  PromoDakaM,
};
