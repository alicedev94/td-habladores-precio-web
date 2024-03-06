// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");
const bwipjs = require("bwip-js");

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
var logoName = "PRUEBA.png";

// -- VARIABLES --

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;
var service = true; // null

// Posición
let boxPositionX = 70;
let boxPositionY = 30;
let priceTalkerDescriptionPositionX = 98;
let priceTalkerDescriptionPositionY = 98;
let priceTalkerBrandPositionX = 103;
let priceTalkerBrandPositionY = 81;
let priceTalkerPositionPriceX = 98;
let priceTalkerPositionPriceY = 175;
let priceTalkerLogoPositionX = 339;
let priceTalkerLogoPositionY = 84;
let priceTalkerCodeSapX = 212;
let priceTalkerCodeSapY = 163;
let priceTalkerPositionWarrantyX = 98;
let priceTalkerPositionWarrantyY = 234;
let priceTalkerBarCodeX = 270;
let priceTalkerBarCodeY = 180;

// Tamaño
const boxWith = 363.54; // 363
const boxHeight = 271.06; // 264
let priceTalkerBarCodeWith = 283.46; // 2.3 cm
let priceTalkerBarCodeHeight = 10; // 0.5 cm
let priceTalkerLogoWith = 48; // 48
let priceTalkerLogoHeight = 43; // 43

// Fuente
const priceTalkerfontSize = 9.57;
const priceTalkerFontSizePrice = 19.13;

// -- Contenido estático
const priceTalkerWidthText = 159.45; // 221 4,7 cm  159.45 = 5cm a 81 dpi o ppi
const priceTalkerFontPath = process.cwd();

// Controlador de flujo para la generación de habladores
let contador = 0;

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
  } catch (err) {
    console.error("Error generating barcode:", err);
  }
}

const bigNewPriceTalker = async (
  dataCallback,
  endCallback,
  priceTalkerData
) => {
  // console.log(priceTalkerData);
  // console.log(priceTalkerData);

  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  // doc.on("data", dataCallback);
  // doc.on("end", endCallback);

  // Borra el contenido existente
  for (let i = 0; i < priceTalkerData.length; i++) {
    const product = priceTalkerData[i];

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
        // .dash(5, { space: 1 })
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
          boxPositionX + 31.89,
          boxPositionY + 70.87, // priceTalkerBrandPositionY
          {
            width: priceTalkerWidthText,
            align: "left",
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
          boxPositionX + 31.89,
          boxPositionY + 82.2,
          {
            width: priceTalkerWidthText,
            align: "left",
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
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }

      // `${dirnameLogo}/${logoName}`

      // // CABLE
      // if(product.priceTalkerSapCode == "LM-00000853") {
      //   logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      // }

      doc.image(
        `${dirnameLogo}/${logoName}`,
        boxPositionX + 212.6,
        boxPositionY + 42.52, // priceTalkerLogoPositionY
        {
          // pathLogo
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
      if (product.priceTalkerIdHablador != "3") {
        // CON .99

        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
          precio = precio - 0.01;
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
          precio = precio - 0.01;
        }
        // FIN DEL BLOQUE DE CODIGO

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
            `$ ${precio}`,
            boxPositionX + 31.89,
            boxPositionY + 141.73 // priceTalkerPositionPriceY
          );
      } else {
        // ENTERO
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
        }
        // FIN DEL BLOQUE DE CODIGO

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
            boxPositionY + 141.73
          );
      }

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
          232.44,
          boxPositionY + 87.87,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(img, 221.1, boxPositionY + 99.21, {
        fit: [priceTalkerBarCodeWith, priceTalkerBarCodeHeight],
        align: "center",
        valign: "center",
      });

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
          boxPositionX + 133.23, // priceTalkerPositionWarrantyX
          boxPositionY + 147.4, // priceTalkerPositionWarrantyY
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
          .fontSize(20)
          .text(`AZ`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`VD`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`NJ`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`MG`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`A`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`B`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
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
          .fontSize(20)
          .text(`C`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);
      }
      // -- 15022024
      if (
        product.priceTalkerList === "3" ||
        product.priceTalkerList === "4" ||
        product.priceTalkerList === "6" ||
        product.priceTalkerList === "7" ||
        product.priceTalkerList === "8" ||
        product.priceTalkerList === "9" ||
        product.priceTalkerList === "10"
      ) {
        // FRASE MERCANCIA ESPECIAL
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
          .fontSize(15)
          .text(
            `MERCANCÍA ESPECIAL`,
            priceTalkerPositionPriceX,
            priceTalkerPositionPriceY + 32
          );
      }
      // -- FIN DEL BLOQUE DE CODIGO

      // -- SERVICIOS DE INSTALACION
      // console.log(product);
      if (product.priceTalkerService != null) {
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
            "Solicita tu Servicio de Instalación",
            boxPositionX + 141.73,
            boxPositionY + 178.58, // priceTalkerBrandPositionY
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );
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
            "LS-00000007",
            boxPositionX + 189.92,
            boxPositionY + 189.92, // priceTalkerBrandPositionY
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );
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
            "$30,00",
            246.61 + 25,
            boxPositionY + 189.92, // priceTalkerBrandPositionY
            {
              width: priceTalkerWidthText,
              align: "center",
            }
          );

        // -- recuadro para sercios post venta
        doc
          .rect(188.98, boxPositionY + 170.08, 188.98, 37.8)
          .lineWidth(0.5)
          .fillOpacity(0)
          .fillAndStroke("gray"); // X, Y , ALTO Y ANCHO
      }
      // --
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
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }

      // `${dirnameLogo}/${logoName}`

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

        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
          precio = precio - 0.01;
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
          precio = precio - 0.01;
        }
        // FIN DEL BLOQUE DE CODIGO

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
            `$ ${precio}`,
            priceTalkerPositionPriceX + boxWith,
            priceTalkerPositionPriceY
          );
      } else {
        // ENTERO
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
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
      }
      // FIN DEL BLOQUE DE CODIGO

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

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(img, priceTalkerBarCodeX + boxWith, priceTalkerBarCodeY, {
        fit: [priceTalkerBarCodeWith, priceTalkerBarCodeHeight],
        align: "center",
        valign: "center",
      });

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
          .fontSize(20)
          .text(
            `AZ`,
            priceTalkerBarCodeX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `VD`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `NJ`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `MG`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `A`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `B`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
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
          .fontSize(20)
          .text(
            `C`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY
          );
      }

      // -- 15022024
      if (
        product.priceTalkerList === "3" ||
        product.priceTalkerList === "4" ||
        product.priceTalkerList === "6" ||
        product.priceTalkerList === "7" ||
        product.priceTalkerList === "8" ||
        product.priceTalkerList === "9" ||
        product.priceTalkerList === "10"
      ) {
        // FRASE MERCANCIA ESPECIAL
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
          .fontSize(15)
          .text(
            `MERCANCÍA ESPECIAL`,
            priceTalkerPositionPriceX + boxWith,
            priceTalkerPositionPriceY + 32
          );
      }
      // FIN DEL CAMPO
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
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }

      // `${dirnameLogo}/${logoName}`

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

        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
          precio = precio - 0.01;
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
          precio = precio - 0.01;
        }
        // FIN DEL BLOQUE DE CODIGO

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
            `$ ${precio}`,
            priceTalkerPositionPriceX,
            priceTalkerPositionPriceY + boxHeight
          );
      } else {
        // ENTERO
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
        }
        // FIN DEL BLOQUE DE CODIGO

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
      }

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

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(img, priceTalkerBarCodeX, priceTalkerBarCodeY + boxHeight, {
        fit: [priceTalkerBarCodeWith, priceTalkerBarCodeHeight],
        align: "center",
        valign: "center",
      });

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
          .fontSize(20)
          .text(
            `AZ`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `VD`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `NJ`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `MG`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `A`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `B`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `C`,
            priceTalkerLogoPositionX - 32,
            priceTalkerLogoPositionY + boxHeight
          );
      }
      // -- 15022024
      if (
        product.priceTalkerList === "3" ||
        product.priceTalkerList === "4" ||
        product.priceTalkerList === "6" ||
        product.priceTalkerList === "7" ||
        product.priceTalkerList === "8" ||
        product.priceTalkerList === "9" ||
        product.priceTalkerList === "10"
      ) {
        // FRASE MERCANCIA ESPECIAL
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
          .fontSize(15)
          .text(
            `MERCANCÍA ESPECIAL`,
            priceTalkerPositionPriceX,
            priceTalkerPositionPriceY + boxHeight + 32
          );
      }
      // FIN DEL CAMPO
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
      } else {
        // EL ID DEL HABLADOR ES 1 LO QUE CORRESPONDE A PROMOCION ACTUAL
        logoName = "LOGO_DAKA_PROMO_ACTUAL.png";
      }

      // `${dirnameLogo}/${logoName}`

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
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
          precio = precio - 0.01;
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
          precio = precio - 0.01;
        }
        // FIN DEL BLOQUE DE CODIGO

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
            `$ ${precio}`,
            priceTalkerPositionPriceX + boxWith,
            priceTalkerPositionPriceY + boxHeight
          );
      } else {
        // ENTERO
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(product.priceTalkerPrice * 1.16);
          precio = Math.round(precio);
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(product.priceTalkerPrice);
          precio = Math.round(precio);
        }
        // FIN DEL BLOQUE DE CODIGO
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
      }

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

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(
        img,
        priceTalkerBarCodeX + boxWith,
        priceTalkerBarCodeY + boxHeight,
        {
          fit: [priceTalkerBarCodeWith, priceTalkerBarCodeHeight],
          align: "center",
          valign: "center",
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
          .fontSize(20)
          .text(
            `AZ`,
            priceTalkerBarCodeX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `VD`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `NJ`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `MG`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `A`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `B`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
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
          .fontSize(20)
          .text(
            `C`,
            priceTalkerLogoPositionX + boxWith - 32,
            priceTalkerLogoPositionY + boxHeight
          );
      }
      // -- 15022024
      if (
        product.priceTalkerList === "3" ||
        product.priceTalkerList === "4" ||
        product.priceTalkerList === "6" ||
        product.priceTalkerList === "7" ||
        product.priceTalkerList === "8" ||
        product.priceTalkerList === "9" ||
        product.priceTalkerList === "10"
      ) {
        // FRASE MERCANCIA ESPECIAL
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
          .fontSize(15)
          .text(
            `MERCANCÍA ESPECIAL`,
            priceTalkerPositionPriceX + boxWith,
            priceTalkerPositionPriceY + boxHeight + 32
          );
      }
      // FIN DEL CAMPO
    }
    contador++;
  }

  contador = 0;
  doc.end();
};

module.exports = {
  bigNewPriceTalker,
};
