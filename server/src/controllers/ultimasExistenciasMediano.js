// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");

// GLOBAL PRECIO PARA EL CALCULO DE PRECIO SEGUN CADA HALADOR
var precio = 0;

// Posición
let priceTalkerDescriptionPositionX = 0;
let priceTalkerDescriptionPositionY = 49;  
let priceTalkerBrandPositionX = 51.5;  
let priceTalkerBrandPositionY = 40.5;  

let priceTalkerPositionPriceX = 113.385;  
let priceTalkerPositionPriceY = 113.385 - 9.45;  

// NUEVAS VARIABLES PARA EL LAYOUT DE HABLADORES 
/* NOTA: LA LETRA (P) AL FINAL DEL CADA VARIABLE INDICA EN ESPAÑOL 
LA FRASE POSICIÓN */
const n1cm = 37.80;
let precioTachadoP = { x:169.98 , y: 166.29};
let precioFullP = { X:226.78, Y:226.78 };

// let priceTalkerPositionPriceX = 132.285 - 18.9;  
// let priceTalkerPositionPriceY = 113.385 - 9.45;  

priceTalkerPositionPriceY + 37.795 + 75.59

// Fuente
const priceTalkerfontSize = 18;  
const priceTalkerFontSizePrice = 50;  
const priceTalkerFontSizePriceNew = 80;  

// -- Contenido estático
const priceTalkerWidthText = n1cm * 6;  
const priceTalkerFontPath = process.cwd();

const habladorUltimasM = async (dataCallback, endCallback, priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "portrait" });  

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  for (let i = 0; i < priceTalkerData.length; i++) {
    const product = priceTalkerData[i];

    let precio = parseFloat(product.priceTalkerPrice);
    let precioTachado;
    precioTachado = Math.trunc(precio);
    // AJUSTAR EL TACHADO YA QUE ESTE PRECIO VIENE EN 0
    precio = Math.round(precio - 5) - 0.01;
    const stringPrecio = precio.toString();
    const regexPunto = /\./g;
    precio = stringPrecio.replace(regexPunto, ",");

    // PRECIO TACHADO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePrice)
      .text(
        `$${precioTachado}`,
        precioTachadoP.x, 
        precioTachadoP.y  
      );
    // PRECIO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerFontSizePriceNew)  
      .text(
        `$${precio}`,
        precioFullP.X,   
        precioFullP.Y  
      );
    // CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerfontSize)  
      .text(
        `${product.priceTalkerSapCode}`,
        priceTalkerPositionPriceX + 56.695 + 75.59 + 37.80 + 37.80,  
        priceTalkerPositionPriceY - 9.45 + n1cm,  
        {
          width: priceTalkerWidthText,  
          align: "center",
        }
      );
    // DESCRIPCION DEL ARTICULO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      .fontSize(priceTalkerfontSize)  
      .text(
        `${product.priceTalkerdescription}`,
        priceTalkerPositionPriceX + 56.695 + 75.59 + 37.80 + 37.80,  
        priceTalkerPositionPriceY + 15.12 + n1cm,  
        {
          width: priceTalkerWidthText,  
          align: "center",
        }
      );
  }

  doc.end();
};

module.exports = {
  habladorUltimasM,
};
