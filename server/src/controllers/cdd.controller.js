const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const path = require("path");
const priceTalkerFontPath = process.cwd();

// DATOS DE PRUEBAS PARA EL CDD
let datos_cdd_prueba = [
  {
    codigo: "ld-00000599",
    descripcion: "playstation 5 slim",
    grupo: "ld"
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

const tipoLetra = "OMEGLE.ttf";
// FIN DE VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD

// LOGO DIRECCION DE LOGO DINAMICO
const dirnameLogo = require("../routes/uploads/index");
var logoName = "LOGO_DAKA_SE_FELIZ.png";

const dataCdd = async () => {
  const response = await sequelize.query(catalogo_productos_cdd);
  return response;
};

const doc = new PDFDocument({ size: "A4", layout: "landscape" });

const geneCdd = async (inicio, fin, datos) => {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  // ESTRUCTURA
  campos.forEach((dato, index) => {
    // PARA EL DISEÑO DE LOS HABLADORES POR CAMPO
    // RE-CUADRO DEL TITULO
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
          tipoLetra
        )
      )
      .fontSize(fontSize)
      .text(
        `${campos[index]}:`, // .toLocaleUpperCase()
        reCuadroTitulo.x,
        reCuadroTitulo.y + n1cm / 2  + divisor,
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
            tipoLetra
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
  });

  // IMAGEN EL PARTE CENTRAL
  doc.image(`${dirnameLogo}/${logoName}`, n1cm * 9, -10, {
    fit: [logo.with, logo.height],
    align: "center",
    valign: "center",
  });

  // REINICIAR VARIABLES DESPUES DE USO
  reCuadroTitulo.X = n1cm * 2;
  divisor = 0;

  // DATA
  datos_cdd_prueba.forEach((dato, index) => {
    // VALOR CODIGO SAP
    doc
      .font(
        path.join(
          priceTalkerFontPath,
          "fonts",
           tipoLetra
        )
      )
      .fontSize(fontSize)
      .text(
        `${dato.codigo}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR DESCRIPCION
    doc
      .font(
        path.join(
          priceTalkerFontPath,
          "fonts",
          tipoLetra
        )
      )
      .fontSize(fontSize)
      .text(
        `${dato.descripcion}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 2 + n1cm / 2,
        {
          align: "left",
        }
      );

      // VALOR GRUPO
         // VALOR DESCRIPCION
    doc
    .font(
      path.join(
        priceTalkerFontPath,
        "fonts",
        tipoLetra
      )
    )
    .fontSize(fontSize)
    .text(
      `${dato.grupo}`, // .toLocaleUpperCase()
      reCuadroTitulo.x + n1cm * 9.1,
      reCuadroTitulo.y + n1cm * 4 + n1cm / 2,
      {
        align: "left",
      }
    );
  });
  // FIN DEL DOCUMENTO
  doc.end();
};

module.exports = { dataCdd, geneCdd };
