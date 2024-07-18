// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");
const bwipjs = require("bwip-js");

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
const { isNull } = require("util");
var logoName = "PRUEBA.png";

// -- VARIABLES --

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;

// Posición
let boxPositionX = 70;
let boxPositionY = 30;
let priceTalkerDescriptionPositionX = 32.7;
let priceTalkerDescriptionPositionY = 66.2;
let priceTalkerBrandPositionX = 32.7;
let priceTalkerBrandPositionY = 54.31; // 74.31
let priceTalkerPositionPriceX = 32.7;
let priceTalkerPositionPriceY = 142.68 + 10; // 142.68
let priceTalkerLogoPositionX = 212.6;
let priceTalkerLogoPositionY = 42.52;
let priceTalkerCodeSapX = 225.91;
let priceTalkerCodeSapY = 89.12;
let priceTalkerPositionWarrantyX = 139.7;
let priceTalkerPositionWarrantyY = 148.62 + 10; // 148.62
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
let mcdColor = false;
let abc = false;

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

let n1cm = 26.6;

let primerosDosCaracteres = "";

// Script options
const optionsBarCode = {
  bcid: "code128", // Barcode type
  text: "0123456789", // Text to encode
  scale: 3, // 3x scaling factor
  height: 10, // Bar height, in millimeters
  includetext: true, // Show human-readable text
  textxalign: "center", // Always good to set this
};

const fuente = path.join(
  priceTalkerFontPath,
  "node_modules",
  "@canvas-fonts",
  "arial",
  "Arial.ttf"
);
const fuenteBold = path.join(
  priceTalkerFontPath,
  "node_modules",
  "@canvas-fonts",
  "arial-bold",
  "Arial Bold.ttf"
);

// COMPONETES
const label = async (doc, contenido, fontSize, x, y, fuente) => {
  doc.font(fuente).fontSize(fontSize).text(contenido, x, y, {
    width: priceTalkerWidthText,
    align: "left",
  });
};
//

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
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

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
        .font(fuenteBold)
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
        .font(fuente)
        .fontSize(priceTalkerfontSize)
        .text(
          product.priceTalkerdescription.toLocaleUpperCase(),
          boxPositionX + priceTalkerDescriptionPositionX, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY, // 2,5 CM
          {
            width: priceTalkerWidthText,
            height: 40,
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
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
            precio = Math.round(precio);
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice * 1.16);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
          //
        } else {
          precio = Math.round(precio);
          // LISTA PARA MARGARITA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        }
        // FIN DEL BLOQUE DE CODIGO

        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
          .fontSize(priceTalkerFontSizePrice)
          .text(
            `$ ${precio},00`,
            boxPositionX + priceTalkerPositionPriceX,
            boxPositionY + priceTalkerPositionPriceY
          );
      }

      // -- CÓDIGO SAP
      doc
        .font(fuente)
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
        fit: [100, 90], // 100 90
        align: "center",
        valign: "center",
      });

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `AZ`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `VD`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `NJ`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `MG`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "8") {
        // ALMACEN A
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `A`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "9") {
        // ALMACEN B
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `B`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "10") {
        // ALMACEN C
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `C`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGOF
      }

      if (mcdColor && abc == false) {
        // -- TIEMPO DE GARANTÍA -- DEBO EXCLUIR A B C
        // 2. En los articulos disponibles en las ubicaciones Verde, azul y naranja esta mostrando la garantia full y no la correspondiente, la que debe mostrar es:
        // 3 meses (90 dias) para las lineas Blanca y Marron
        // 1 mes para el resto de las lineas
        primerosDosCaracteres = product.priceTalkerSapCode.substring(0, 2);
        if (primerosDosCaracteres == "LB" || primerosDosCaracteres == "LM") {
          product.priceTalkerWarranty = "90";
        } else {
          product.priceTalkerWarranty = "30";
        }
        // FIN DEL BLOQUE
      }

      doc
        .font(fuente)
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

      // -- SERVICIOS DE INSTALACION #ASJDADHKAS
      if (product.priceTalkerService != null && mcdColor === false) {
        // is not null
        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
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
          .font(fuenteBold)
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
        doc
          .rect(
            boxPositionX + priceTalkerReBoxX,
            boxPositionY + priceTalkerReBoxY,
            priceTalkerReBoxW,
            priceTalkerReBoxH
          )
          .stroke(); // X, Y , ALTO Y ANCHO
      }
      // --

      // MEDIDAS PARA LA PISCION UNO DE LOS NUEVOS CAMPOS
      if (product.ancho != null) {
        label(doc, "MEDIDAS:".toLocaleUpperCase(), 8, 103, 135, fuenteBold);
        label(doc, "Ancho:", 8, 103, 145, fuente);
        label(doc, `${product.ancho}cm`, 8, 143, 145, fuente);
      }

      if (product.alto != null) {
        label(doc, "Alto:", 8, 103, 155, fuente);
        label(doc, `${product.alto}cm`, 8, 143, 155, fuente);
      }

      if (product.profundo != null) {
        label(doc, "Profundo:", 8, 103, 165, fuente);
        label(doc, `${product.profundo}cm`, 8, 143, 165, fuente);
      }
      // --

      // LAS VARRIABLES TIENEN QUE VOLVER A SU VALOR ORIGINAL
      mcdColor = false;
      abc = false;
      // FIN DEL CODIGO
    } else if (contador == 1) {
      // box 1
      doc
        .rect(boxPositionX + boxWith, boxPositionY, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        // .dash(5, { space: 1 })
        .stroke();

      // -- MARCA --
      doc
        .font(fuenteBold)
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
        .font(fuente)
        .fontSize(priceTalkerfontSize)
        .text(
          product.priceTalkerdescription.toLocaleUpperCase(),
          boxPositionX + priceTalkerDescriptionPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY, // 2,5 CM
          {
            width: priceTalkerWidthText,
            height: 40,
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
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice * 1.16);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        } else {
          // LISTA PARA MARGARITA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        }
        // FIN DEL BLOQUE DE CODIGO

        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
          .fontSize(priceTalkerFontSizePrice)
          .text(
            `$ ${precio},00`,
            boxPositionX + priceTalkerPositionPriceX + boxWith,
            boxPositionY + priceTalkerPositionPriceY
          );
      }

      // -- CÓDIGO SAP
      doc
        .font(fuente)
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `AZ`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `VD`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `NJ`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(`MG`, priceTalkerLogoPositionX - 32, priceTalkerLogoPositionY);

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "8") {
        // ALMACEN A
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `A`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "9") {
        // ALMACEN B
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `B`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "10") {
        // ALMACEN C
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `C`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      }

      // -- TIEMPO DE GARANTÍA --
      if (mcdColor && abc == false) {
        // -- TIEMPO DE GARANTÍA -- DEBO EXCLUIR A B C
        // 2. En los articulos disponibles en las ubicaciones Verde, azul y naranja esta mostrando la garantia full y no la correspondiente, la que debe mostrar es:
        // 3 meses (90 dias) para las lineas Blanca y Marron
        // 1 mes para el resto de las lineas
        primerosDosCaracteres = product.priceTalkerSapCode.substring(0, 2);
        if (primerosDosCaracteres == "LB" || primerosDosCaracteres == "LM") {
          product.priceTalkerWarranty = "90";
        } else {
          product.priceTalkerWarranty = "30";
        }
        // FIN DEL BLOQUE
      }
      doc
        .font(fuente)
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

      // -- SERVICIOS DE INSTALACION
      if (product.priceTalkerService != null && mcdColor === false) {
        // is not null
        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
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
          .font(fuenteBold)
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
        doc
          .rect(
            boxPositionX + priceTalkerReBoxX + boxWith,
            boxPositionY + priceTalkerReBoxY,
            priceTalkerReBoxW,
            priceTalkerReBoxH
          )
          .stroke(); // x y w h priceTalkerReBoxX =  148.62 priceTalkerReBoxY =  181.32 priceTalkerReBoxW=154.57 priceTalkerReBoxH=29.72
        // .lineWidth(0.5)
        // .fillOpacity(0)
        // .fillAndStroke("gray"); // X, Y , ALTO Y ANCHO
      }
      // --

      // MEDIDAS PARA LA PISCION UNO DE LOS NUEVOS CAMPOS
      if (product.ancho != null) {
        label(
          doc,
          "MEDIDAS:".toLocaleUpperCase(),
          8,
          n1cm * 16.5,
          135,
          fuenteBold
        );
        label(doc, "Ancho:", 8, n1cm * 16.5, 145, fuente);
        label(doc, `${product.ancho}cm`, 8, n1cm * 16.5 + 40, 145, fuente);
      }

      if (product.alto != null) {
        label(doc, "Alto:", 8, n1cm * 16.5, 155, fuente);
        label(doc, `${product.alto}cm`, 8, n1cm * 16.5 + 40, 155, fuente);
      }

      if (product.profundo != null) {
        label(doc, "Profundo:", 8, n1cm * 16.5, 165, fuente);
        label(doc, `${product.profundo}cm`, 8, n1cm * 16.5 + 40, 165, fuente);
      }
      // --

      // LAS VARRIABLES TIENEN QUE VOLVER A SU VALOR ORIGINAL
      mcdColor = false;
      abc = false;
      // FIN DEL CODIGO
    } else if (contador == 2) {
      // box 1
      doc
        .rect(boxPositionX, boxPositionY + boxHeight, boxWith, boxHeight) // X, Y , ALTO Y ANCHO
        // .dash(5, { space: 1 })
        .stroke();

      // -- MARCA --
      doc
        .font(fuenteBold)
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
        .font(fuente)
        .fontSize(priceTalkerfontSize)
        .text(
          product.priceTalkerdescription.toLocaleUpperCase(),
          boxPositionX + priceTalkerDescriptionPositionX, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY + boxHeight, // 2,5 CM
          {
            width: priceTalkerWidthText,
            height: 40,
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
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice * 1.16);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        } else {
          // LISTA PARA MARGARITA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        }
        // FIN DEL BLOQUE DE CODIGO

        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
          .fontSize(priceTalkerFontSizePrice)
          .text(
            `$ ${precio},00`,
            boxPositionX + priceTalkerPositionPriceX,
            boxPositionY + priceTalkerPositionPriceY + boxHeight
          );
      }

      // -- CÓDIGO SAP
      doc
        .font(fuente)
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `AZ`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `VD`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `NJ`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `MG`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "8") {
        // ALMACEN A
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `A`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "9") {
        // ALMACEN B
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `B`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "10") {
        // ALMACEN C
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `C`,
            priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      }

      // -- TIEMPO DE GARANTÍA --
      if (mcdColor && abc == false) {
        // -- TIEMPO DE GARANTÍA -- DEBO EXCLUIR A B C
        // 2. En los articulos disponibles en las ubicaciones Verde, azul y naranja esta mostrando la garantia full y no la correspondiente, la que debe mostrar es:
        // 3 meses (90 dias) para las lineas Blanca y Marron
        // 1 mes para el resto de las lineas
        primerosDosCaracteres = product.priceTalkerSapCode.substring(0, 2);
        if (primerosDosCaracteres == "LB" || primerosDosCaracteres == "LM") {
          product.priceTalkerWarranty = "90";
        } else {
          product.priceTalkerWarranty = "30";
        }
        // FIN DEL BLOQUE
      }

      doc
        .font(fuente)
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

      // -- SERVICIOS DE INSTALACION
      if (product.priceTalkerService != null && mcdColor === false) {
        // null
        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
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
          .font(fuenteBold)
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
        doc
          .rect(
            boxPositionX + priceTalkerReBoxX,
            boxPositionY + priceTalkerReBoxY + boxHeight,
            priceTalkerReBoxW,
            priceTalkerReBoxH
          )
          .stroke(); // x y w h priceTalkerReBoxX =  148.62 priceTalkerReBoxY =  181.32 priceTalkerReBoxW=154.57 priceTalkerReBoxH=29.72
        // .lineWidth(0.5)
        // .fillOpacity(0)
        // .fillAndStroke("gray"); // X, Y , ALTO Y ANCHO
      }
      // --

      // MEDIDAS PARA LA PISCION UNO DE LOS NUEVOS CAMPOS
      if (product.ancho != null) {
        label(
          doc,
          "MEDIDAS:".toLocaleUpperCase(),
          8,
          103,
          n1cm * 14.5,
          fuenteBold
        );
        label(doc, "Ancho:", 8, 103, n1cm * 14.5 + 10, fuente);
        label(doc, `${product.ancho}cm`, 8, 143, n1cm * 14.5 + 10, fuente);
      }

      if (product.alto != null) {
        label(doc, "Alto:", 8, 103, n1cm * 14.5 + 20, fuente);
        label(doc, `${product.alto}cm`, 8, 143, n1cm * 14.5 + 20, fuente);
      }

      if (product.profundo != null) {
        label(doc, "Profundo:", 8, 103, n1cm * 14.5 + 30, fuente);
        label(doc, `${product.profundo}cm`, 8, 143, n1cm * 14.5 + 30, fuente);
      }
      // --

      // LAS VARRIABLES TIENEN QUE VOLVER A SU VALOR ORIGINAL
      mcdColor = false;
      abc = false;
      // FIN DEL CODIGO
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
        .font(fuenteBold)
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
        .font(fuente)
        .fontSize(priceTalkerfontSize)
        .text(
          product.priceTalkerdescription.toLocaleUpperCase(),
          boxPositionX + priceTalkerDescriptionPositionX + boxWith, // 1,1 CM
          boxPositionY + priceTalkerDescriptionPositionY + boxHeight, // 2,5 CM
          {
            width: priceTalkerWidthText,
            height: 40,
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
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice * 1.16);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        } else {
          // LISTA PARA MARGARITA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (product.priceTalkerPrice < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(product.priceTalkerPrice);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(product.priceTalkerPrice);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        }
        // FIN DEL BLOQUE DE CODIGO

        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
          .fontSize(priceTalkerFontSizePrice)
          .text(
            `$ ${precio},00`,
            boxPositionX + priceTalkerPositionPriceX + boxWith,
            boxPositionY + priceTalkerPositionPriceY + boxHeight
          );
      }

      // -- CÓDIGO SAP
      doc
        .font(fuente)
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

      // NUEVO CAMPO LETRA SEGUN EL ALMACEN
      if (product.priceTalkerList === "3") {
        // ALMACEN AZUL
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `AZ`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "6") {
        // ALMACEN VERDE
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `VD`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;

        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "4") {
        // ALMACEN NARANJA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `NJ`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "7") {
        // ALMACEN MAGENTA
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `MG`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "8") {
        // ALMACEN A
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `A`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "9") {
        // ALMACEN B
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `B`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      } else if (product.priceTalkerList === "10") {
        // ALMACEN C
        doc
          .font(fuenteBold)
          .fontSize(20)
          .text(
            `C`,
            boxWith + priceTalkerLogoPositionX + ajusteMcd,
            boxHeight + boxPositionY + priceTalkerLogoPositionY
          );

        // EN CASO DE TNER ALMACEN DE COLOR
        mcdColor = true;
        abc = true;
        // FIN DEL BLOQUE DE CODIGO
      }

      // -- TIEMPO DE GARANTÍA --

      if (mcdColor && abc == false) {
        // -- TIEMPO DE GARANTÍA -- DEBO EXCLUIR A B C
        // 2. En los articulos disponibles en las ubicaciones Verde, azul y naranja esta mostrando la garantia full y no la correspondiente, la que debe mostrar es:
        // 3 meses (90 dias) para las lineas Blanca y Marron
        // 1 mes para el resto de las lineas
        primerosDosCaracteres = product.priceTalkerSapCode.substring(0, 2);
        if (primerosDosCaracteres == "LB" || primerosDosCaracteres == "LM") {
          product.priceTalkerWarranty = "90";
        } else {
          product.priceTalkerWarranty = "30";
        }
        // FIN DEL BLOQUE
      }

      doc
        .font(fuente)
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

      // -- SERVICIOS DE INSTALACION #ASJDADHKAS
      if (product.priceTalkerService != null && mcdColor === false) {
        // null
        doc
          .font(fuenteBold)
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
          .font(fuenteBold)
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
          .font(fuenteBold)
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
        doc
          .rect(
            boxPositionX + priceTalkerReBoxX + boxWith,
            boxPositionY + priceTalkerReBoxY + boxHeight,
            priceTalkerReBoxW,
            priceTalkerReBoxH
          )
          .stroke();
      }
      // --

      // MEDIDAS PARA LA PISCION UNO DE LOS NUEVOS CAMPOS
      if (product.ancho != null) {
        label(
          doc,
          "MEDIDAS:".toLocaleUpperCase(),
          8,
          n1cm * 16.5, n1cm * 14.5,
          fuenteBold
        );
        label(doc, "Ancho:", 8, n1cm * 16.5, n1cm * 14.5 + 10, fuente);
        label(doc, `${product.ancho}cm`, 8, n1cm * 16.5 + 40, n1cm * 14.5 + 10, fuente);
      }

      if (product.alto != null) {
        label(doc, "Alto:", 8,  n1cm * 16.5, n1cm * 14.5 + 20, fuente);
        label(doc, `${product.alto}cm`, 8,  n1cm * 16.5 + 40, n1cm * 14.5 + 20, fuente);
      }

      if (product.profundo != null) {
        label(doc, "Profundo:", 8,  n1cm * 16.5, n1cm * 14.5 + 30, fuente);
        label(doc, `${product.profundo}cm`, 8,  n1cm * 16.5 + 40, n1cm * 14.5 + 30, fuente);
      }
      // --

      // LAS VARRIABLES TIENEN QUE VOLVER A SU VALOR ORIGINAL
      mcdColor = false;
      abc = false;
      // FIN DEL CODIGO
    }
    contador++;
  }

  contador = 0;
  doc.end();
};

module.exports = {
  bigNewPriceTalker,
};
