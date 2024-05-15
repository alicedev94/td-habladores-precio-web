const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const path = require("path");
const priceTalkerFontPath = process.cwd();

// DATOS DE PRUEBAS PARA EL CDD
let datos_cdd_prueba = [
  {
    codigo_prueba: "00_1",
    nombre_prueba: "phone",
    precio_prueba: 700,
  },
  {
    codigo_prueba: "00_2",
    nombre_prueba: "tablet",
    precio_prueba: 673,
  },
  {
    codigo_prueba: "00_3",
    nombre_prueba: "headphones",
    precio_prueba: 120,
  },
];

// VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD
let n1cm = 37.8;
let divisor = 0;
let fontSize = 30;

let campos = [
  "código sap",
  "descripción",
  "grupo artículo",
  "ubicación",
  "cantidad",
];

let reCuadroTitulo = {
  x: n1cm * 2,
  y: n1cm * 3,
  with: n1cm * 8.4,
  height: n1cm * 1.5,
  radio: n1cm / 3.5,
};

let logo = {
  with: 125,
  height: 125,
};
// FIN DE VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
var logoName = "PRUEBA.png";

const dataCdd = async () => {
  const response = await sequelize.query(catalogo_productos_cdd);
  return response;
};

const geneCdd = async (inicio, fin, datos) => {
  // CREACIÓN DEL NUEVO DOCUMENTO
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", inicio);
  doc.on("end", fin);

  // LOGO CENTRAL DE LA PLANTILLA
  logoName = "LOGO_DAKA_SE_FELIZ.png";

  doc.image(`${dirnameLogo}/${logoName}`, n1cm * 9, -10, {
    fit: [logo.with, logo.height],
    align: "center",
    valign: "center",
  });

  // PARA EL DISEÑO DE HABLADORES POR DATO
  datos_cdd_prueba.forEach((producto, index) => {
    console.log("hablador por dato,", producto);
    // PARA EL DISEÑO DE LOS HABLADORES POR CAMPO
    if (index == 0) {
      for (let index = 0; index < campos.length; index++) {
        // RE-CUADRO DEL TITULO
        console.log("hablador por titulo,", producto);
        doc
          .roundedRect(
            reCuadroTitulo.x - n1cm / 2,
            reCuadroTitulo.y + divisor,
            reCuadroTitulo.with,
            reCuadroTitulo.height,
            reCuadroTitulo.radio
          )
          .stroke();

        // TITULO
        doc
          .font(
            path.join(
              priceTalkerFontPath,
              "fonts",
              "SpecifyPersonalCondensedBlack-Eg2g.ttf"
            )
          )
          .fontSize(fontSize)
          .text(
            `${producto[index]}:`, // .toLocaleUpperCase()
            reCuadroTitulo.x,
            reCuadroTitulo.y + divisor,
            {
              align: "left",
            }
          ),
          // RECUADRO VALOR
          doc
            .roundedRect(
              reCuadroTitulo.x + n1cm * 8.1,
              reCuadroTitulo.y + divisor,
              n1cm * 10,
              reCuadroTitulo.height,
              reCuadroTitulo.radio
            )
            .stroke();
        // PRODUCTOS VALOR
        let propiedad_producto = Object.keys(producto);
        for (let i = 0; i < propiedad_producto.length; i++) {
          doc
            .font(
              path.join(
                priceTalkerFontPath,
                "fonts",
                "SpecifyPersonalCondensedBlack-Eg2g.ttf"
              )
            )
            .fontSize(fontSize)
            .text(
              `${propiedad_producto[i].toLocaleUpperCase()}`,
              reCuadroTitulo.x + n1cm * 8.1,
              reCuadroTitulo.y + divisor,
              {
                align: "left",
              }
            );
        }

        // CONTROLA LA DISTASNCIA DE CADA RECUADRO POR VUELTA
        if (index == 3) {
          // SI ES EL CAMPO CANTIDAD LLEVA OTRO FORMATO
          reCuadroTitulo.height += reCuadroTitulo.height * 1.5;

          // SUBTITULO EN EL ULTIMO CAMPO
          doc
            .font(
              path.join(
                priceTalkerFontPath,
                "fonts",
                "SpecifyPersonalCondensedBlack-Eg2g.ttf"
              )
            )
            .fontSize(fontSize)
            .text(
              "UNIDADES",
              reCuadroTitulo.x + n1cm * 14.5,
              reCuadroTitulo.y + n1cm * 3.7 + divisor,
              {
                align: "left",
              }
            ),
            // SEGUIR CON EL CURSO DE LA APP
            (divisor += n1cm * 2);
        } else {
          divisor += n1cm * 2;
        }
      }
    }
  });

  // REINICIAR VARIABLES DESPUES DE USO
  reCuadroTitulo.X = n1cm * 2;

  // FIN DEL DOCUMENTO
  doc.end();
};

module.exports = { dataCdd, geneCdd };
