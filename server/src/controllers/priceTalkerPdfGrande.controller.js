// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pathLogo = require("../img/index");
const bwipjs = require("bwip-js");

// -- VARIABLES --

// Posición
const boxPositionX = 3;
const boxPositionY = 3;
const priceTalkerDescriptionPositionX = 28;
const priceTalkerDescriptionPositionY = 68;
const priceTalkerBrandPositionX = 33;
const priceTalkerBrandPositionY = 51;
const priceTalkerPositionPriceX = 28;
const priceTalkerPositionPriceY = 145;

// Tamaño
const boxWith = 363;
const boxHeight = 264;

// Fuente
const priceTalkerfontSize = 12;
const priceTalkerFontSizePrice = 30;

// -- Contenido dinamico -- // MODIFICAR A UN OBJETO PARA PODER ACCEDER A LAS PROPIEDADES
// const priceTalkerBrand = "GREEN OFFICE";
// const priceTalkerdescription =
//   "ESCRITORIO GAMER CON REPISA E ILUMINACION LED CNEGRO GODGB3 GREEN OFFICE";
// const priceTalkerPrice = 145;

// const priceTalkerData = {
//   priceTalkerBrand: "GREEN OFFICE",
//   priceTalkerdescription:
//     "ESCRITORIO GAMER CON REPISA E ILUMINACION LED CNEGRO GODGB3 GREEN OFFICE",
//   priceTalkerPrice: 145,
// };

// -- Contenido estático
const priceTalkerWidthText = 221;
const priceTalkerFontPath =
  "c:/Users/d.marcano/Desktop/td-habladores-precio-web/server";
const doc = new PDFDocument({ size: "A4", layout: "landscape" });

// -- Contenido calculado box
// Box1
// Box2
let boxPositionX2 = boxPositionX + boxWith + 2;
// Box3
let boxPositionY3 = boxPositionY + boxHeight + 2;
// Box4

// Script options
const optionsBarCode = {
  bcid: "code128", // Barcode type
  text: "0123456789", // Text to encode
  scale: 3, // 3x scaling factor
  height: 10, // Bar height, in millimeters
  includetext: true, // Show human-readable text
  textxalign: "center", // Always good to set this
};

// Functions
async function generateBarcode(text) {
  optionsBarCode.text = text;

  try {
    const png = await bwipjs.toBuffer(optionsBarCode);
    return png;
    //await fs.writeFile("barcode.png", png);
    //console.log("Barcode image generated successfully!");
  } catch (err) {
    console.error("Error generating barcode:", err);
  }
}

const bigPriceTalker = async (priceTalkerData) => {
  // -- MARCA --
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial-bold",
        "Arial Bold.ttf"
      )
    )
    .fontSize(priceTalkerfontSize)
    .text(
      priceTalkerData.priceTalkerBrand.toLocaleUpperCase(),
      priceTalkerBrandPositionX,
      priceTalkerBrandPositionY,
      {
        width: priceTalkerWidthText,
        align: "center",
      }
    );

  // -- DESCRIPCIÓN --
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial",
        "Arial.ttf"
      )
    )
    .fontSize(priceTalkerfontSize)
    .text(
      priceTalkerData.priceTalkerdescription.toLocaleUpperCase(),
      priceTalkerDescriptionPositionX,
      priceTalkerDescriptionPositionY,
      {
        width: priceTalkerWidthText,

        align: "center",
      }
    );

  // -- LOGO --
  doc.image(pathLogo, 269, 54, {
    fit: [48, 43],
    align: "center",
    valign: "center",
  });

  // -- PRECIO --
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial-bold",
        "Arial Bold.ttf"
      )
    )
    .fontSize(priceTalkerFontSizePrice)
    .text(
      `$ ${priceTalkerData.priceTalkerPrice},00`,
      priceTalkerPositionPriceX,
      priceTalkerPositionPriceY
    );

  // -- CÓDIGO SAP
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial",
        "Arial.ttf"
      )
    )
    .fontSize(priceTalkerfontSize)
    .text("ld-00002917".toLocaleUpperCase(), 142, 133, {
      width: priceTalkerWidthText,
      align: "center",
    });

  // -- CÓDIGO DE BARRAS
  const img = await generateBarcode("ld-00002917");
  doc.image(img, 200, 150, {
    fit: [99, 28],
    align: "center",
    valign: "center",
  });

  // doc
  //   .font(
  //     path.join(
  //       priceTalkerFontPath,
  //       "node_modules",
  //       "@canvas-fonts",
  //       "arial",
  //       "Arial.ttf"
  //     )
  //   )
  //   .fontSize(8)
  //   .text("ld-00002917".toLocaleUpperCase(), 142, 145, {
  //     width: priceTalkerWidthText,
  //     align: "center",
  //   });

  // -- TIEMPO DE GARANTÍA --
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial",
        "Arial.ttf"
      )
    )
    .fontSize(10)
    .text(`Tiempo de Garantía ${360} días`, 28, 204, {
      width: priceTalkerWidthText,
      align: "center",
    });

  // -- RECUADRO QUE ENCIERRA EL HABLADOR --

  // box 1
  doc
    .rect(boxPositionX, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
    .dash(5, { space: 1 })
    .stroke();
  // box 2
  doc
    .rect(boxPositionX2, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
    .dash(5, { space: 1 })
    .stroke();
  // box 3
  doc
    .rect(boxPositionX, boxPositionY3, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
    .dash(5, { space: 1 })
    .stroke();
  // box 4
  doc
    .rect(boxPositionX2, boxPositionY3, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
    .dash(5, { space: 1 })
    .stroke();

  // Passing size to the addPage function
  //doc.addPage({ size: "A4", layout:"landscape" });

  const rta = doc.pipe(fs.createWriteStream(`file24424.pdf`)); // C:/Users/d.marcano/Desktop/

  doc.end();

  return rta;
};

// bigPriceTalker({
//   priceTalkerBrand: "SONY",
//   priceTalkerdescription:
//     "NO PUES GAMER CON REPISA E ILUMINACION LED CNEGRO GODGB3 GREEN OFFICE",
//   priceTalkerPrice: 1000,
// });

module.exports = {
  bigPriceTalker,
};
