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

// Posición
let boxPositionX = 70;
let boxPositionY = 30;
let priceTalkerDescriptionPositionX = 32.7;
let priceTalkerDescriptionPositionY = 86.2;
let priceTalkerBrandPositionX = 32.7;
let priceTalkerBrandPositionY = 74.31;
let priceTalkerPositionPriceX = 32.7;
let priceTalkerPositionPriceY = 142.68;
let priceTalkerLogoPositionX = 212.6;
let priceTalkerLogoPositionY = 42.52;
let priceTalkerCodeSapX = 225.91;
let priceTalkerCodeSapY = 89.12;
let priceTalkerPositionWarrantyX = 139.7;
let priceTalkerPositionWarrantyY = 148.62;
let priceTalkerBarCodeX = 190;
let priceTalkerBarCodeY = 105;
let priceTalkerReBoxX = 148.62;
let priceTalkerReBoxY = 181.32;
let priceTalkerReBoxW = 154.57;
let priceTalkerReBoxH = 29.72;
let priceTalkerServiceY = 184.29;
let priceTalkerServiceX = 154.57;
let priceTalkerCodeServicePositionX = 196.18;
let priceTalkerCodeServicedPositionY = 196.18;
let priceTalkerCodeServicePricePositionX = 258.6;
let priceTalkerCodeServicePricePositionY = 196.18;
let ajusteMcd = 29.72;

// Tamaño
const boxWith = 335.89; // 363
const boxHeight = 249.69; // 264
let priceTalkerBarCodeWith = 104.04; // 2.3 cm
let priceTalkerBarCodeHeight = 29.72; // 0.5 cm
let priceTalkerLogoWith = 48; // 48
let priceTalkerLogoHeight = 43; // 43

// Fuente
const priceTalkerfontSize = 9.57;
const priceTalkerFontSizePrice = 19.13;
const priceTalkerFontSizeService = 9;
const priceTalkerFontSizeServicePrice = 14;

// -- Contenido estático
const priceTalkerWidthText = 148.62; // 5 cm en 75.5 dpi
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
          boxPositionX + priceTalkerBrandPositionX, // 1,1 CM
          boxPositionY + priceTalkerBrandPositionY, // 2,9 CM
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
          boxPositionX + priceTalkerDescriptionPositionX, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY, // 2,5 CM
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
        boxPositionX + priceTalkerLogoPositionX,
        boxPositionY + priceTalkerLogoPositionY, // priceTalkerLogoPositionY
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
            boxPositionX + priceTalkerPositionPriceX, // 1,1 CM
            boxPositionY + priceTalkerPositionPriceY // 5 CM
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
            boxPositionX + priceTalkerPositionPriceX,
            boxPositionY + priceTalkerPositionPriceY
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
          boxPositionY + priceTalkerCodeSapY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(img, boxPositionX + priceTalkerBarCodeX, priceTalkerBarCodeY, {
        fit: [100, 90],
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
          boxPositionX + priceTalkerPositionWarrantyX, // 4,7 CM
          boxPositionY + priceTalkerPositionWarrantyY, //
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
          .text(
            `AZ`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
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
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );
      }

      // -- SERVICIOS DE INSTALACION #ASJDADHKAS
      // console.log(product);
      if (product.priceTalkerService != null) {
        // null
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            "Solicita tu Servicio de Instalación",
            boxPositionX + priceTalkerServiceX, // 154.57
            boxPositionY + priceTalkerServiceY, // priceTalkerServiceY = 184.29 priceTalkerServiceX = 154.57
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            product.priceTalkerService,
            boxPositionX + priceTalkerCodeServicePositionX,
            boxPositionY + priceTalkerCodeServicedPositionY, // priceTalkerCodeServicedPositionY
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
          .fontSize(priceTalkerFontSizeServicePrice)
          .text(
            `$${product.priceTalkerServicePrice},00`,
            boxPositionX + priceTalkerCodeServicePricePositionX,
            boxPositionY + priceTalkerCodeServicePricePositionY,
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );
        // -- recuadro para sercios post venta
        doc.rect(
          boxPositionX + priceTalkerReBoxX,
          boxPositionY + priceTalkerReBoxY,
          priceTalkerReBoxW,
          priceTalkerReBoxH
        ); // X, Y , ALTO Y ANCHO
      }
      // --
    } else if (contador == 1) {
      // box 1
      doc
        .rect(boxPositionX + boxWith, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
          boxPositionX + priceTalkerBrandPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerBrandPositionY, // 2,9 CM
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
          boxPositionX + priceTalkerDescriptionPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY, // 2,5 CM
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

      doc.image(
        `${dirnameLogo}/${logoName}`,
        boxPositionX + priceTalkerLogoPositionX + boxWith,
        boxPositionY + priceTalkerLogoPositionY, // priceTalkerLogoPositionY
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
            boxPositionX + priceTalkerPositionPriceX + boxWith, // 1,1 CM
            boxPositionY + priceTalkerPositionPriceY // 5 CM
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
            boxPositionX + priceTalkerPositionPriceX + boxWith,
            boxPositionY + priceTalkerPositionPriceY
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
          boxPositionY + priceTalkerCodeSapY,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(
        img,
        boxPositionX + priceTalkerBarCodeX + boxWith,
        priceTalkerBarCodeY,
        {
          fit: [100, 90],
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
          boxPositionX + priceTalkerPositionWarrantyX + boxWith, // 4,7 CM
          boxPositionY + priceTalkerPositionWarrantyY, //
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

      // -- SERVICIOS DE INSTALACION
      // console.log(product.priceTalkerService);
      if (product.priceTalkerService != null) {
        // is not null
        // console.log("Entramos", product.priceTalkerService);
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            "Solicita tu Servicio de Instalación",
            boxPositionX + priceTalkerServiceX + boxWith, // 154.57
            boxPositionY + priceTalkerServiceY, // priceTalkerServiceY = 184.29 priceTalkerServiceX = 154.57
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            product.priceTalkerService,
            boxPositionX + priceTalkerCodeServicePositionX + boxWith,
            boxPositionY + priceTalkerCodeServicedPositionY, // priceTalkerCodeServicedPositionY
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
          .fontSize(priceTalkerFontSizeServicePrice)
          .text(
            `$${product.priceTalkerServicePrice},00`,
            boxPositionX + priceTalkerCodeServicePricePositionX + boxWith,
            boxPositionY + priceTalkerCodeServicePricePositionY,
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );

        // -- recuadro para sercios post venta
        doc.rect(
          boxPositionX + priceTalkerReBoxX + boxWith,
          boxPositionY + priceTalkerReBoxY,
          priceTalkerReBoxW,
          priceTalkerReBoxH
        ); // x y w h priceTalkerReBoxX =  148.62 priceTalkerReBoxY =  181.32 priceTalkerReBoxW=154.57 priceTalkerReBoxH=29.72
        // .lineWidth(0.5)
        // .fillOpacity(0)
        // .fillAndStroke("gray"); // X, Y , ALTO Y ANCHO
      }
      // --
    } else if (contador == 2) {
      // box 1
      doc
        .rect(boxPositionX, boxPositionY + boxHeight, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
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
          boxPositionX + priceTalkerBrandPositionX, // 1,1 CM
          boxPositionY + priceTalkerBrandPositionY + boxHeight, // 2,9 CM
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
          boxPositionX + priceTalkerDescriptionPositionX, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY + boxHeight, // 2,5 CM
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

      doc.image(
        `${dirnameLogo}/${logoName}`,
        boxPositionX + priceTalkerLogoPositionX,
        boxPositionY + priceTalkerLogoPositionY + boxHeight, // priceTalkerLogoPositionY
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
            boxPositionX + priceTalkerPositionPriceX, // 1,1 CM
            boxPositionY + priceTalkerPositionPriceY + boxHeight // 5 CM
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
            boxPositionX + priceTalkerPositionPriceX,
            boxPositionY + priceTalkerPositionPriceY + boxHeight
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
          boxPositionY + priceTalkerCodeSapY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(
        img,
        boxPositionX + priceTalkerBarCodeX,
        priceTalkerBarCodeY + boxHeight,
        {
          fit: [100, 90], // cordenadas
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
          boxPositionX + priceTalkerPositionWarrantyX, // 4,7 CM
          boxPositionY + priceTalkerPositionWarrantyY + boxHeight, //
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

      // -- SERVICIOS DE INSTALACION
      // console.log(product);
      if (product.priceTalkerService != null) {
        // null
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            "Solicita tu Servicio de Instalación",
            boxPositionX + priceTalkerServiceX, // 154.57
            boxPositionY + priceTalkerServiceY + boxHeight, // priceTalkerServiceY = 184.29 priceTalkerServiceX = 154.57
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            product.priceTalkerService,
            boxPositionX + priceTalkerCodeServicePositionX,
            boxPositionY + priceTalkerCodeServicedPositionY + boxHeight, // priceTalkerCodeServicedPositionY
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
          .fontSize(priceTalkerFontSizeServicePrice)
          .text(
            `$${product.priceTalkerServicePrice},00`,
            boxPositionX + priceTalkerCodeServicePricePositionX,
            boxPositionY + priceTalkerCodeServicePricePositionY + boxHeight,
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );

        // -- recuadro para sercios post venta
        doc.rect(
          boxPositionX + priceTalkerReBoxX,
          boxPositionY + priceTalkerReBoxY + boxHeight,
          priceTalkerReBoxW,
          priceTalkerReBoxH
        ); // x y w h priceTalkerReBoxX =  148.62 priceTalkerReBoxY =  181.32 priceTalkerReBoxW=154.57 priceTalkerReBoxH=29.72
        // .lineWidth(0.5)
        // .fillOpacity(0)
        // .fillAndStroke("gray"); // X, Y , ALTO Y ANCHO
      }
      // --
    } else if (contador == 3) {
      // box 1
      doc
        .rect(
          boxPositionX + boxWith,
          boxPositionY + boxHeight,
          boxWith,
          boxHeight
        ) // X, Y , ALTO Y ANCHO
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
          boxPositionX + priceTalkerBrandPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerBrandPositionY + boxHeight, // 2,9 CM
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
          boxPositionX + priceTalkerDescriptionPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY + boxHeight, // 2,5 CM
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

      doc.image(
        `${dirnameLogo}/${logoName}`,
        boxPositionX + priceTalkerLogoPositionX + boxWith,
        boxPositionY + priceTalkerLogoPositionY + boxHeight, // priceTalkerLogoPositionY
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
            boxPositionX + priceTalkerPositionPriceX + boxWith, // 1,1 CM
            boxPositionY + priceTalkerPositionPriceY + boxHeight // 5 CM
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
            boxPositionX + priceTalkerPositionPriceX + boxWith,
            boxPositionY + priceTalkerPositionPriceY + boxHeight
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
          boxPositionY + priceTalkerCodeSapY + boxHeight,
          {
            width: priceTalkerWidthText,
            align: "center",
          }
        );

      // -- CÓDIGO DE BARRAS
      const img = await generateBarcode(product.priceTalkerBarCode);
      doc.image(
        img,
        boxPositionX + priceTalkerBarCodeX + boxWith,
        priceTalkerBarCodeY + boxHeight,
        {
          fit: [100, 90],
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
          boxPositionX + priceTalkerPositionWarrantyX + boxWith, // 4,7 CM
          boxPositionY + priceTalkerPositionWarrantyY + boxHeight, //
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

      // -- SERVICIOS DE INSTALACION #ASJDADHKAS
      // console.log(product);
      if (product.priceTalkerService != null) {
        console.log("aqui");

        // null
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            "Solicita tu Servicio de Instalación",
            boxPositionX + priceTalkerServiceX + boxWith, // 154.57
            boxPositionY + priceTalkerServiceY + boxHeight, // priceTalkerServiceY = 184.29 priceTalkerServiceX = 154.57
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
          .fontSize(priceTalkerFontSizeService)
          .text(
            product.priceTalkerService,
            boxPositionX + priceTalkerCodeServicePositionX + boxWith,
            boxPositionY + priceTalkerCodeServicedPositionY + boxHeight, // priceTalkerCodeServicedPositionY
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
          .fontSize(priceTalkerFontSizeServicePrice)
          .text(
            `$${product.priceTalkerServicePrice},00`,
            boxPositionX + priceTalkerCodeServicePricePositionX + boxWith,
            boxPositionY + priceTalkerCodeServicePricePositionY + boxHeight,
            {
              width: priceTalkerWidthText,
              align: "left",
            }
          );
        doc.rect(
          boxPositionX,
          boxPositionY,
          priceTalkerReBoxW,
          priceTalkerReBoxH
        );
      }
      console.log("asdka");
      // --
    }
    contador++;
  }

  contador = 0;
  doc.end();
};

module.exports = {
  bigNewPriceTalker,
};
