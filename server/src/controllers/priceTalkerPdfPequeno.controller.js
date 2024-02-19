// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pathLog1 = require("../img/index");
const moment = require("moment-timezone");

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
var logoName = "PRUEBA.png";

// -- VARIABLES --

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;

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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "right",
          valign: "right",
        }
      );

      // -- PRECIOnew --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(precio * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;

        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);

        // console.log(precio);

        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(precio * 1.16);
        // precio = precio.toFixed(2);

        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `AZ`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `VD`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `NJ`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `MG`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "8") {
        // ALMACEN VERDE
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
            `A`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "9") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `B`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "10") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `C`,
            priceTalkerBrandPositionX + 120,
            priceTalkerBrandPositionY
          );
      }
      // -- 15022024
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIOnew --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(precio * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(precio * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `AZ`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `VD`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `NJ`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `MG`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "8") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `AA`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "9") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `B`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "10") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(`C`, priceTalkerBrandPositionX + boxWith + 120,
          priceTalkerBrandPositionY);
      }
      // -- 15022024
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);

        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `AZ`,
            priceTalkerBrandPositionX + boxWith +  boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `VD`,
            priceTalkerBrandPositionX + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `NJ`,
            priceTalkerBrandPositionX + boxWith + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `MG`,
            priceTalkerBrandPositionX + boxWith + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "8") {
        // ALMACEN A
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `AA`,
            priceTalkerBrandPositionX + boxWith + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "9") {
        // ALMACEN B
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
          .fontSize(priceTalkerfontSize + 2)
          .text(
            `B`,
            priceTalkerBrandPositionX + boxWith + boxWith + 120,
            priceTalkerBrandPositionY
          );
      } else if (product.priceTalkerList === "10") {
        // ALMACEN C
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
          .fontSize(priceTalkerfontSize + 2)
          .text(`C`,  priceTalkerBrandPositionX + boxWith+ boxWith + 120,
          priceTalkerBrandPositionY);
      }
      // -- 15022024
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      // TYPES PROMOTION
      /*
          1 PROMO ACTUAL
          2 SE FELIZ .99
          3 SE FELIZ CON ENTERO
          4 POR APLICAR
        */
      if (product.priceTalkerIdHablador != 1) {
        // EL ID DEL HABLADOR ES DIFERENTE DE 1 POR LO CUAL ES LOGO SE FELIZ
        logoName = "LOGO_DAKA_SE_FELIZ.png";
        3;
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }
      doc.image(
        `${dirnameLogo}/${logoName}`,
        priceTalkerLogoPositionX + boxWith + boxWith,
        priceTalkerLogoPositionY + boxHeight + boxHeight + boxHeight,
        {
          fit: [priceTalkerLogoWith, priceTalkerLogoHeight],
          align: "center",
          valign: "center",
        }
      );

      // -- PRECIO --
      // TYPES PROMOTION
      /*
        1 PROMO ACTUAL
        2 SE FELIZ .99
        3 SE FELIZ CON ENTERO
        4 POR APLICAR
      */
      if (product.priceTalkerIdHablador != 3) {
        // CON .99
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = parseFloat(precio.toFixed(2));
        // precio = precio - 0.01;
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      } else {
        // ENTERO
        // precio = Math.ceil(product.priceTalkerPrice * 1.16);
        // precio = precio.toFixed(2);
        precio = parseFloat(product.priceTalkerPrice * 1.16);
        precio = Math.round(precio);
      }

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
          `$ ${precio},00`,
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
      `${process.env.USERPROFILE}/Documents/Habladores-Precio-Web/${horaVenezuela}p.pdf` // ${horaVenezuela}p
    )
  );
  return writeStream;
};

module.exports = {
  smallPriceTalker,
};
