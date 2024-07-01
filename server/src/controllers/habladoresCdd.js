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
var logoName = "LODO_DAKA_REDONDO.png";

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

const estructuraCddM = (
  doc,
  fontSizeH,
  tEstructura,
  ajusteT,
  medidaGlobal,
  segundaPosicionM,
  posicion
) => {
  let margenImagen = 0;
  
  if (posicion == 1) {
    margenImagen = 5;
  }

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
          segundaPosicionM + margenImagen,
        reCuadroTitulo.with / tEstructura,
        reCuadroTitulo.height / tEstructura + 15,
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
          segundaPosicionM +
          10 + margenImagen,
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
            segundaPosicionM + margenImagen,
          (n1cm * 10) / tEstructura + 20,
          reCuadroTitulo.height / tEstructura + 15,
          reCuadroTitulo.radio / tEstructura
        )
        .stroke();
    divisor += n1cm * 2.5;
  });

    // IMAGEN EL PARTE CENTRALl
    doc.image(
      `${dirnameLogo}/${logoName}`,
      (n1cm * 9) / tEstructura + 10,
      -10 / tEstructura + segundaPosicionM + margenImagen + 30,
      {
        fit: [logo.with / 2, logo.height / 2],
        align: "center",
        valign: "center",
      }
    );


  // REINICIAR VARIABLES DESPUES DE USO
  reCuadroTitulo.X = n1cm * 2;
  divisor = 0;
  margenImagen = 0;
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
        `Galpón: ${dato.galpon}`, // .toLocaleUpperCase()
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
  let fontSizeM = fontSize / 1.3; // Tamaño de la letra entre mayor es el numero mas pqueña la letra.
  let ajusteM = fontSizeM / 2; // ANTES DE CAGARLA
  let reCuadroTituloM = -10;
  let medidaGlobal = 20;
  let contador = 0;

  estructuraCddM(
    doc,
    fontSizeM,
    valorM,
    ajusteM,
    medidaGlobal,
    segundaPosicionM,
    0
  );

  // DATA
  datos.forEach((dato, index) => {
    if (contador > 1) {
      // != (Esto deberia generar dos habladores por pagina)
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCddM(
        doc,
        fontSizeM,
        valorM,
        ajusteM,
        medidaGlobal,
        segundaPosicionM,
        0
      );
      contador = 0;
    }

    // Controlar la posicion del segundo layout
    if (contador == 1) {
      segundaPosicionM = n1cm * 10;
      estructuraCddM(
        doc,
        fontSizeM,
        valorM,
        ajusteM,
        medidaGlobal,
        segundaPosicionM,
        1
      );
    }

    // VALOR CODIGO SAP
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `${dato.priceTalkerSapCode}`.toLocaleUpperCase(), // .toLocaleUpperCase()
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y +
          n1cm / 2 / valorM -
          medidaGlobal +
          segundaPosicionM +
          5,
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
          segundaPosicionM +
          20,
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
          segundaPosicionM +
          30,
        {
          align: "left",
        }
      );

    // VALOR UBICACION
    doc
      .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
      .fontSize(fontSizeM)
      .text(
        `Galpón: ${dato.cantidad}`.toLocaleUpperCase(), //
        reCuadroTitulo.x + (n1cm * 9.1) / valorM,
        reCuadroTitulo.y +
          (n1cm * 6) / valorM +
          ajusteM -
          medidaGlobal +
          segundaPosicionM +
          45,
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
          segundaPosicionM +
          60,
        {
          align: "left",
        }
      );

    // Reiniciar valores
    segundaPosicionM = 0;

    // Terminado el proceso aumentamos una vuelta
    contador++;

    // // que ya posse mas de dos habladorees en la pagina
    // if(contador > 1) {
    //   // reinicimaos su valor para que cree una nueva pagina y coloque nuevos habladores
    //   contador = 0;
    // }
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
  estructuraCdd(doc, fontSizeM, valorM, ajusteP, medidaGlobal, 0);

  // DATA
  datos.forEach((dato, index) => {
    if (index != 0) {
      // Agrega una nueva página para cada producto después del primero
      doc.addPage();
      estructuraCdd(doc, fontSizeM, valorM, ajusteP, medidaGlobal, 0);
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
        `Galpón: ${dato.cantidad}`.toLocaleUpperCase(), //
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
  estructuraCdd,
};
