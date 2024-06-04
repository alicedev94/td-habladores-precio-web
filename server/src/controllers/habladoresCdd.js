const path = require("path");
const priceTalkerFontPath = process.cwd();

// VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD
let n1cm = 37.8;
let divisor = 0;
let fontSize = 30;

let campos = [
  "CODIGO SAP",
  "DESCRIPCION",
  "GRUPO ARTICULO",
  "UBICACION",
  "CANTIDAD",
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

const estructuraCdd = (doc, fontSizeH, tEstructura) => {
  // ESTRUCTURA
  campos.forEach((dato, index) => {
    // PARA EL DISEÑO DE LOS HABLADORES POR CAMPO
    // RE-CUADRO DEL TITULO
    doc
      .roundedRect(
        reCuadroTitulo.x - n1cm / 2 /tEstructura,
        reCuadroTitulo.y + divisor / tEstructura,
        reCuadroTitulo.with / tEstructura,
        reCuadroTitulo.height / tEstructura,
        reCuadroTitulo.radio / tEstructura
      )
      .stroke();

    // TITULO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeH)
      .text(
        `${campos[index]}:`, // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm/2) /  tEstructura,
        reCuadroTitulo.y + n1cm / 2 + divisor / tEstructura,
        {
          align: "left",
        }
      ),
      // RECUADRO VALOR
      doc
        .roundedRect(
          reCuadroTitulo.x + n1cm * 8.1 / tEstructura,
          reCuadroTitulo.y + divisor / tEstructura,
          n1cm * 10 / tEstructura,
          reCuadroTitulo.height / tEstructura,
          reCuadroTitulo.radio / tEstructura
        )
        .stroke();
    divisor += n1cm * 2;
  });

  // IMAGEN EL PARTE CENTRALl
  doc.image(`${dirnameLogo}/${logoName}`, n1cm * 9 / tEstructura, -10 / tEstructura, {
    fit: [logo.with / tEstructura, logo.height / tEstructura],
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

  let valorM = 1;
  estructuraCdd(doc, fontSize, valorM);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc, fontSize, valorM);
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

  let valorM = 1.5;
  let fontSizeM = fontSize / 1.45;
  estructuraCdd(doc, fontSizeM, valorM);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc, fontSizeM);
    }
    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.priceTalkerSapCode}`.toLocaleUpperCase(), // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + (n1cm / 2) / valorM,
        {
          align: "left",
        }
      );

    // VALOR DESCRIPCION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.priceTalkerdescription}`.toLocaleUpperCase(), // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + (n1cm * 2) / valorM,
        {
          height: (n1cm * 2) / valorM,
          width: n1cm * 5,
          align: "left",
        }
      );

    // VALOR GRUPO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.linea}`.toLocaleUpperCase(), // 
        reCuadroTitulo.x + n1cm * 9.1 / valorM,
        reCuadroTitulo.y + n1cm * 4 / valorM,
        {
          align: "left",
        }
      );

    // VALOR UBICACION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `Galpón: ${ubicacion}`.toLocaleUpperCase(), // 
        reCuadroTitulo.x + n1cm * 9.1 / valorM,
        reCuadroTitulo.y + n1cm * 6 / valorM,
        {
          align: "left",
        }
      );

    // VALOR CANTIDAD
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.cantidad} UNIDADES`, // .toLocaleUpperCase()
        reCuadroTitulo.x + n1cm * 9.1 / valorM,
        reCuadroTitulo.y + n1cm * 8 / valorM,
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
