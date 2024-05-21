// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");
const { generarPrecio ,validarTachado } = require("../controllers/funciones.hablador");

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
    var rtaPrecio = validarTachado(precioTachado, priceTalkerPrice);
    
    // AÑADIR NUEVAS PAGINA
    if (contador > 0) {
      doc.addPage({ size: "A4", layout: "landscape" });
      contador = 0;
    }

    // 1 ES UN ERROR Y 0 SIGMNIFICA QUE PROCEDE
    if (rtaPrecio != 0) {
      // ERROR PRECIO TACHADO
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(7.5)
        .fillColor('red')
        .text(
          "El precio tachado no es, al menos, $5 menor que el precio de venta.", // ${precioTachado}
          priceTalkerPositionPriceX,
          priceTalkerPositionPriceY - 37.80
        );
    }

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .fillColor('black')
      .text(
        `$${product.precioTachado}`, // ${precioTachado}
        priceTalkerPositionPriceX,
        priceTalkerPositionPriceY + 11.34
      );

    // LOGICA DE PRECIO
    let precio = generarPrecio(priceTalkerPrice, priceTalkerList);
    // FIN DE LA LOGICA DE PRECIO

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
  if (rtaPrecio != 0) {
    rtaPrecio = 0;
    return "Algunos de los artículos seleccionados presentan un precio tachado que supera el precio de venta.";
  }
};

module.exports = {
  habladorUltimasExistenciasG,
};
