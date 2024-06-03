const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const path = require("path");
const priceTalkerFontPath = process.cwd();

// VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD
let n1cm = 37.8;
let divisor = 0;
let fontSize = 30;

let campos = [
  "Código sap",
  "Descripción",
  "Grupo artículo",
  "Ubicación",
  "Cantidad",
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

const estructuraCdd = (doc) => {
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
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${campos[index]}:`, // .toLocaleUpperCase()
        reCuadroTitulo.x,
        reCuadroTitulo.y + n1cm / 2 + divisor,
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
    divisor += n1cm * 2;
  });

  // IMAGEN EL PARTE CENTRALl
  doc.image(`${dirnameLogo}/${logoName}`, n1cm * 9, -10, {
    fit: [logo.with, logo.height],
    align: "center",
    valign: "center",
  });

  // REINICIAR VARIABLES DESPUES DE USO
  reCuadroTitulo.X = n1cm * 2;
  divisor = 0;
};

function habladorG(inicio, fin, datos, cantidad, ubicacion, doc) {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  estructuraCdd(doc);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc);
    }
    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerSapCode}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR DESCRIPCION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerdescription}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 2,
        {
          height: n1cm * 2,
          align: "left",
        }
      );

    // VALOR GRUPO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.linea}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 4 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR UBICACION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `Galpón: ${ubicacion}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 6 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR CANTIDAD
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.cantidad} UNIDADES`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 8 + n1cm / 2,
        {
          align: "left",
        }
      );
  });
  // FIN DEL DOCUMENTO
  doc.end();
}

function habladorM(inicio, fin, datos, cantidad, ubicacion, doc) {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  estructuraCdd(doc);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc);
    }
    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerSapCode}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR DESCRIPCION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerdescription}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 2,
        {
          height: n1cm * 2,
          align: "left",
        }
      );

    // VALOR GRUPO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.linea}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 4 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR UBICACION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `Galpón: ${ubicacion}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 6 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR CANTIDAD
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.cantidad} UNIDADES`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 8 + n1cm / 2,
        {
          align: "left",
        }
      );
  });
  // FIN DEL DOCUMENTO
  doc.end();
}

function habladorP(inicio, fin, datos, cantidad, ubicacion, doc) {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  estructuraCdd(doc);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc);
    }
    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerSapCode}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR DESCRIPCION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.priceTalkerdescription}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 2,
        {
          height: n1cm * 2,
          align: "left",
        }
      );

    // VALOR GRUPO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.linea}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 4 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR UBICACION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `Galpón: ${ubicacion}`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 6 + n1cm / 2,
        {
          align: "left",
        }
      );

    // VALOR CANTIDAD
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSize)
      .text(
        `${dato.cantidad} UNIDADES`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1,
        reCuadroTitulo.y + n1cm * 8 + n1cm / 2,
        {
          align: "left",
        }
      );
  });
  // FIN DEL DOCUMENTO
  doc.end();
}

module.exports = {
  habladorG,
    habladorM,
    habladorP,
};
