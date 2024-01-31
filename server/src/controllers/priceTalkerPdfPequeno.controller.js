// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pathLogo = require("../img/index");
const moment = require("moment-timezone");

// -- VARIABLES --

// Posición
let boxPositionX = 70;
let boxPositionY = 30;
let priceTalkerDescriptionPositionX = 98;
let priceTalkerDescriptionPositionY = 53; // px 0,8 cm
let priceTalkerBrandPositionX = 103;
let priceTalkerBrandPositionY = 44; // px 0,5 cm
let priceTalkerPositionPriceX = 105;
let priceTalkerPositionPriceY = 84; // px 1,9 cm
let priceTalkerLogoPositionX = 194;
let priceTalkerLogoPositionY = 84; // p
let priceTalkerCodeSapX = 99;
let priceTalkerCodeSapY = 113;
let priceTalkerPositionWarrantyX = 98;
let priceTalkerPositionWarrantyY = 113;

// Tamaño
const boxWith = 239; //px 7,5 cm ppp 81
const boxHeight = 112; //px 3,5 cm

let priceTalkerBarCodeWith = 99;
let priceTalkerBarCodeHeight = 28;
let priceTalkerLogoWith = 32; // px 1,1 cm
let priceTalkerLogoHeight = 29; // px 0,9 cm dev951753*

// Fuente
const priceTalkerfontSize = 8;
const priceTalkerFontSizePrice = 18;

// -- Contenido estático
const priceTalkerWidthText = 128; // px 4,5 cm
const priceTalkerFontPath =
  "c:/Users/d.marcano/Desktop/td-habladores-precio-web/server";

// Controlador de flujo para la generación de habladores
let contador = 0;

// -- Contenido calculado box
// Box1
// Box2
let boxPositionX2 = boxPositionX + boxWith; // + 2 distancia funcional
// Box3
let boxPositionY3 = boxPositionY + boxHeight; // + 2 distancia funcional
// Box4

// Box3 smallPriceTalker
let boxPositionX3 = boxPositionX2 + boxWith; // + 2 distancia funcional

// SmallTaalkersBox
let priceTalkerBrandPositionX3 = priceTalkerBrandPositionX + boxWith + boxWith;

const smallPriceTalker = async (priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  // Borra el contenido existente
  for (let i = 0; i < priceTalkerData.length; i++) {
    const product = priceTalkerData[i];

    // Script para determinar la cantidad de habladores que se deben renderizar por pagina
    if (contador > 11) {
      // Passing size to the addPage function
      doc.addPage({ size: "A4", layout: "landscape" });
      contador = 0;
    }
    if (contador == 0) {
      // POSITION 01
      doc
        .rect(boxPositionX, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO +3 para que aprezca pegado a la
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
        align: "right",
        valign: "right",
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
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 1) {
      // POSITION 02
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
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 2) {
      // POSITION 03
      doc
        .rect(boxPositionX3, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionX3,
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
          priceTalkerDescriptionPositionX + boxWith + boxWith,
          priceTalkerDescriptionPositionY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith + boxWith,
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
          priceTalkerPositionPriceX + boxWith + boxWith,
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
          priceTalkerCodeSapX + boxWith + boxWith,
          priceTalkerCodeSapY,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith + boxWith,
          priceTalkerPositionWarrantyY,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 3) {
      // POSITION 04
      doc
        .rect(boxPositionX, boxPositionY + boxHeight, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 4) {
      doc
        .rect(boxPositionX2, boxPositionY + boxHeight, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 5) {
      doc
        .rect(boxPositionX3, boxPositionY + boxHeight, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionX3,
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
          priceTalkerDescriptionPositionX + boxWith + boxWith,
          priceTalkerDescriptionPositionY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith + boxWith,
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
          priceTalkerPositionPriceX + boxWith + boxWith,
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
          priceTalkerCodeSapX + boxWith + boxWith,
          priceTalkerCodeSapY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith + boxWith,
          priceTalkerPositionWarrantyY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 6) {
      doc
        .rect(
          boxPositionX,
          boxPositionY + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionY + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
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
          priceTalkerPositionPriceY + boxHeight + boxHeight
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
          priceTalkerCodeSapY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 7) {
      doc
        .rect(
          boxPositionX2,
          boxPositionY + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionY + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
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
          priceTalkerPositionPriceY + boxHeight + boxHeight
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
          priceTalkerCodeSapY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 8) {
      doc
        .rect(
          boxPositionX3,
          boxPositionY + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionX3,
          priceTalkerBrandPositionY + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionX + boxWith + boxWith,
          priceTalkerDescriptionPositionY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
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
          priceTalkerPositionPriceX + boxWith + boxWith,
          priceTalkerPositionPriceY + boxHeight + boxHeight
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
          priceTalkerCodeSapX + boxWith + boxWith,
          priceTalkerCodeSapY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith + boxWith,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 9) {
      doc
        .rect(
          boxPositionX,
          boxPositionY + boxHeight + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerPositionPriceY + boxHeight + boxHeight + boxHeight
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
          priceTalkerCodeSapY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 10) {
      doc
        .rect(
          boxPositionX2,
          boxPositionY + boxHeight + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerPositionPriceY + boxHeight + boxHeight + boxHeight
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
          priceTalkerCodeSapY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    } else if (contador == 11) {
      doc
        .rect(
          boxPositionX3,
          boxPositionY + boxHeight + boxHeight + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          priceTalkerBrandPositionX3,
          priceTalkerBrandPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerDescriptionPositionX + boxWith + boxWith,
          priceTalkerDescriptionPositionY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- LOGO --
      doc.image(
        pathLogo,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
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
          priceTalkerPositionPriceX + boxWith + boxWith,
          priceTalkerPositionPriceY + boxHeight + boxHeight + boxHeight
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
          priceTalkerCodeSapX + boxWith + boxWith,
          priceTalkerCodeSapY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "right",
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
        .fontSize(priceTalkerfontSize)
        .text(
          `Garantía ${product.priceTalkerWarranty} días`,
          priceTalkerPositionWarrantyX + boxWith + boxWith,
          priceTalkerPositionWarrantyY + boxHeight + boxHeight + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "left",
          }
        );
    }

    contador++;
  }

  contador = 0;
  doc.end();

  let horaVenezuela = moment()
    .tz("America/Caracas")
    .format()
    .replace(/:/g, "-")
    .replace(/-/g, "_");
  const writeStream = doc.pipe(
    fs.createWriteStream(
      `${process.env.USERPROFILE}/Documents/Habladores-Precio-Web/pequeno.pdf` // ${horaVenezuela}p
    )
  );
  return writeStream;
};

module.exports = {
  smallPriceTalker,
};
