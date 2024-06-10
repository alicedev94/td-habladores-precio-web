const path = require("path");
const priceTalkerFontPath = process.cwd();

// VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD
let n1cm = 37.8;
let divisor = 0;
let fontSize = 30;
let segundaPosicionM = 0;

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

const estructuraCdd = (
  doc,
  fontSizeH,
  tEstructura,
  ajusteT,
  medidaGlobal,
  segundaPosicionM
) => {
  // ESTRUCTURA
  campos.forEach((dato, index) => {
    // PARA EL DISEÑO DE LOS HABLADORES POR CAMPO
    // RE-CUADRO DEL TITULO
    doc
      .roundedRect(
        reCuadroTitulo.x - n1cm / 2 / tEstructura,
        reCuadroTitulo.y +
          divisor / tEstructura -
          medidaGlobal +
          segundaPosicionM,
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
        reCuadroTitulo.x + n1cm / 2 / tEstructura,
        reCuadroTitulo.y +
          n1cm / 2 +
          divisor / tEstructura -
          ajusteT -
          medidaGlobal +
          segundaPosicionM,
        {
          align: "left",
        }
      ),
      // RECUADRO VALOR
      doc
        .roundedRect(
          reCuadroTitulo.x + (n1cm * 8.1) / tEstructura,
          reCuadroTitulo.y +
            divisor / tEstructura -
            medidaGlobal +
            segundaPosicionM,
          (n1cm * 10) / tEstructura,
          reCuadroTitulo.height / tEstructura,
          reCuadroTitulo.radio / tEstructura
        )
        .stroke();
    divisor += n1cm * 2;
  });

  // IMAGEN EL PARTE CENTRALl
  doc.image(
    `${dirnameLogo}/${logoName}`,
    (n1cm * 9) / tEstructura,
    -10 / tEstructura + segundaPosicionM,
    {
      fit: [logo.with / tEstructura, logo.height / tEstructura],
      align: "center",
      valign: "center",
    }
  );

  // REINICIAR VARIABLES DESPUES DE USO
  reCuadroTitulo.X = n1cm * 2;
  divisor = 0;
};

function habladorG(inicio, fin, datos, cantidad, ubicacion, doc) {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  let valorM = 1;
  let valorNeutro = 0;
  let medidaGlobal = 0;
  estructuraCdd(doc, fontSize, valorM, valorNeutro, medidaGlobal, 0);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc, fontSize, valorM, valorNeutro, medidaGlobal, 0);
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
  let ajusteM = fontSizeM / 2;
  let medidaGlobal = 20;

  estructuraCdd(
    doc,
    fontSizeM,
    valorM,
    ajusteM,
    medidaGlobal,
    segundaPosicionM
  );

  // DATA
  datos.forEach((dato, index) => {
    if (index > 1) {
      // != (Esto deberia generar dos habladores por pagina)
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(
        doc,
        fontSizeM,
        valorM,
        ajusteM,
        medidaGlobal,
        segundaPosicionM
      );
    }

    // Controlar la posicion del segundo layout
    if (index == 1) {
      segundaPosicionM = n1cm * 10;
      estructuraCdd(
        doc,
        fontSizeM,
        valorM,
        ajusteM,
        medidaGlobal,
        segundaPosicionM
      );
    } 

    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.priceTalkerSapCode}`.toLocaleUpperCase(), // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + n1cm / 2 / valorM - medidaGlobal + segundaPosicionM,
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
        reCuadroTitulo.y +
          (n1cm * 2) / valorM -
          medidaGlobal +
          segundaPosicionM,
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
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y +
          (n1cm * 4) / valorM +
          ajusteM -
          medidaGlobal +
          segundaPosicionM,
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
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y +
          (n1cm * 6) / valorM +
          ajusteM -
          medidaGlobal +
          segundaPosicionM,
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
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y +
          (n1cm * 8) / valorM +
          ajusteM -
          medidaGlobal +
          segundaPosicionM,
        {
          align: "left",
        }
      );

      // Reiniciar valores
      segundaPosicionM = 0;
  });
  // FIN DEL DOCUMENTO
  doc.end();
}

function habladorP(inicio, fin, datos, cantidad, ubicacion, doc) {
  // CREACIÓN DEL NUEVO DOCUMENTO
  doc.on("data", inicio);
  doc.on("end", fin);

  let valorM = 2;
  let fontSizeM = fontSize / 2;
  let ajusteP = fontSizeM / 2;
  let medidaGlobal = 50;
  estructuraCdd(doc, fontSizeM, valorM, ajusteP, medidaGlobal);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc, fontSizeM, valorM, ajusteP, medidaGlobal);
    }
    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.priceTalkerSapCode}`.toLocaleUpperCase(), // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + n1cm / 2 / valorM - medidaGlobal,
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
        reCuadroTitulo.y + (n1cm * 2) / valorM - medidaGlobal,
        {
          height: (n1cm * 2) / valorM,
          width: n1cm * 4,
          align: "left",
        }
      );

    // VALOR GRUPO
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.linea}`.toLocaleUpperCase(), //
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + (n1cm * 4) / valorM + ajusteP - medidaGlobal,
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
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + (n1cm * 6) / valorM + ajusteP - medidaGlobal,
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
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y + (n1cm * 8) / valorM + ajusteP - medidaGlobal,
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
