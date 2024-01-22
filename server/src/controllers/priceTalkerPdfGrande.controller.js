// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pathLogo = require("../img/index");
const bwipjs = require("bwip-js");
const moment = require("moment-timezone");

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
// Logo
let priceTalkerLogoPositionX = 269;
let priceTalkerLogoPositionY = 54;
let priceTalkerLogoWith = 48;
let priceTalkerLogoHeight = 43;
let priceTalkerCodeSapX = 142;
let priceTalkerCodeSapY = 133;
let priceTalkerPositionWarrantyX = 28; 
let priceTalkerPositionWarrantyY = 204;

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

let contador = 0;

const bigPriceTalker = async (priceTalkerData) => {
  priceTalkerData.forEach((product) => { 
    // Script para determinar la cantidad de habladores que se deben renderizar por pagina
    if (contador > 3) {
      // Passing size to the addPage function
      doc.addPage({ size: "A4", layout: "landscape" });
      contador = 0;
    }
    if (contador == 0) {
      // box 1
      doc
        .rect(boxPositionX, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        .dash(5, { space: 1 })
        .stroke();

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
          product.priceTalkerBrand.toLocaleUpperCase(),
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
          product.priceTalkerdescription.toLocaleUpperCase(),
          priceTalkerDescriptionPositionX,
          priceTalkerDescriptionPositionY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(pathLogo, priceTalkerLogoPositionX, priceTalkerLogoPositionY, {
        fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
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
          `$ ${product.priceTalkerPrice}`,
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
        .text(
          product.priceTalkerSapCode.toLocaleUpperCase(),
          priceTalkerCodeSapX,
          priceTalkerCodeSapY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

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
        .text(
          `Tiempo de Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );
    } else if (contador == 1) {
      // box 2
      doc
        .rect(boxPositionX2, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        .dash(5, { space: 1 })
        .stroke();

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
          product.priceTalkerBrand.toLocaleUpperCase(),
          priceTalkerBrandPositionX + boxWith,
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
          product.priceTalkerdescription.toLocaleUpperCase(),
          priceTalkerDescriptionPositionX + boxWith,
          priceTalkerDescriptionPositionY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

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
          `$ ${product.priceTalkerPrice}`,
          priceTalkerPositionPriceX + boxWith,
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
        .text(
          product.priceTalkerSapCode.toLocaleUpperCase(),
          priceTalkerCodeSapX + boxWith,
          priceTalkerCodeSapY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

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
        .text(
          `Tiempo de Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );
    } else if (contador == 2) {
      // box 3
      doc
        .rect(boxPositionX, boxPositionY3, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        .dash(5, { space: 1 })
        .stroke();

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
          product.priceTalkerBrand.toLocaleUpperCase(),
          priceTalkerBrandPositionX,
          priceTalkerBrandPositionY + boxHeight,
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
          product.priceTalkerdescription.toLocaleUpperCase(),
          priceTalkerDescriptionPositionX,
          priceTalkerDescriptionPositionY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

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
          `$ ${product.priceTalkerPrice}`,
          priceTalkerPositionPriceX,
          priceTalkerPositionPriceY + boxHeight
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
        .text(
          product.priceTalkerSapCode.toLocaleUpperCase(),
          priceTalkerCodeSapX,
          priceTalkerCodeSapY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

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
        .text(
          `Tiempo de Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );
    } else if (contador == 3) {
      // box 4
      doc
        .rect(boxPositionX2, boxPositionY3, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        .dash(5, { space: 1 })
        .stroke();

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
          product.priceTalkerBrand.toLocaleUpperCase(),
          priceTalkerBrandPositionX + boxWith,
          priceTalkerBrandPositionY + boxHeight,
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
          product.priceTalkerdescription.toLocaleUpperCase(),
          priceTalkerDescriptionPositionX + boxWith,
          priceTalkerDescriptionPositionY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

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
          `$ ${product.priceTalkerPrice}`,
          priceTalkerPositionPriceX + boxWith,
          priceTalkerPositionPriceY + boxHeight
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
        .text(
          product.priceTalkerSapCode.toLocaleUpperCase(),
          priceTalkerCodeSapX + boxWith,
          priceTalkerCodeSapY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

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
        .text(
          `Tiempo de Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY + boxHeight,
          { 
            width: priceTalkerWidthText,
            align: "center",
          }
        );
    }
    contador++;
  });

  contador = 0;
  doc.pipe(fs.createWriteStream(`lll.pdf`)); // C:/Users/d.marcano/Desktop/ ${horaVenezuela}
  const rta = doc.end();
  return rta;
};


// // -- CÓDIGO DE BARRAS
// const img = await generateBarcode(priceTalkerData.priceTalkerBarCode);
// doc.image(img, 200, 150, {
//   fit: [99, 28],
//   align: "center",
//   valign: "center",
// });

// let horaVenezuela = moment()
//   .tz("America/Caracas")
//   .format()
//   .replace(/:/g, "-")
//   .replace(/-/g, "_");
// doc.pipe(fs.createWriteStream(`${horaVenezuela}.pdf`)); // C:/Users/d.marcano/Desktop/ ${horaVenezuela}
// const rta = doc.end();

module.exports = {
  bigPriceTalker,
};
