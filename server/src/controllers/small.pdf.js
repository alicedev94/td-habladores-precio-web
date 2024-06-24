const path = require("path");
const discoLocalC = process.cwd();

const fontSize = 16;
const tipoLetra = "OMEGLE.ttf";

let campos = ["CODIGO SAP:", "DESCRIPCION:", "GRUPO ARTICULO:", "UBICACION:"];

const label = (doc, contenido, fontSize, x, y) => {
  doc
    .font(path.join(discoLocalC, "fonts", tipoLetra))
    .fontSize(fontSize)
    .text(contenido, x, y, {
      align: "left",
    });
};

const input = (doc, ancho, alto, x, y) => {
  doc.roundedRect(x, y, ancho, alto, 4).stroke();
};

const estructura = (doc, x, y, interlineadoTitulo) => {
  campos.forEach((titulo, index) => {
    // Label (doc, contenido, fontSize, x, y)
    label(doc, titulo, fontSize, x, y + 12.5);

    // Campo Titulo
    // Input (doc, ancho, alto, x, y)
    input(doc, 145, 40, 40, y);
    console.log(y);

    // Campo valor
    // Input (doc, ancho, alto, x, y)
    input(doc, 200, 40, 190, y);

    // Imagen (doc, ruta, imagen, ancho, alto, x, y)
    if (index == 0) {
      imagen(doc, rutaLogo, nombreLogo, 80, 80, 450, y);
    };

    // Cantidad
    if (index == 2) {
      label(doc, "cantidad:".toLocaleUpperCase(), fontSize, 425, y - 20);
    }

    if (index == 3) {
      // Unidades
      label(doc, "unidades".toLocaleUpperCase(), fontSize, 350+100, y + 20);
      input(doc, 140, 100, 395, y - 60);
    }

    y += interlineadoTitulo;
  });

  // Unidades
  // input(doc, 40, 40, 190, y - 62);
  // label(doc, "unidades".toLocaleUpperCase(), fontSize, 350, y - interlineadoTitulo);
};

// LOGO DIRECCION DE LOGO DINAMICO
const rutaLogo = require("../routes/uploads/index");
var nombreLogo = "LODO_DAKA_REDONDO.png";

const imagen = (doc, ruta, imagen, ancho, alto, x, y) => {
  doc.image(`${ruta}/${imagen}`, x, y, {
    fit: [alto, ancho],
    align: "center",
    valign: "center",
  });
};

const habladorP2 = async (inicio, fin, datos, cantidad, ubicacion, doc) => {
  doc.on("data", inicio);
  doc.on("end", fin);

  let x = 50;
  let y = 40;

  let interlineadoTitulo = 60;

  // Estructura (doc, x, y, interlineadoTitulo)
  estructura(doc, x, y, interlineadoTitulo);

  let primeraPosicion = {
    codigoSap: 40 + 10,
    descripcion: 50,
    grupoArticulo: 100,
    ubicacion: 150,
    cordenadaX: 150 + 60,
  };

  // Iteración del hablador
  let conVueltas = 0;
  datos.map((hablador) => {
    // Primera Posición
    if (conVueltas == 0) {
      // Código Sap
      label(
        doc,
        hablador.priceTalkerSapCode,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.codigoSap
      );

      // Descripción
      // label(
      //   doc,
      //   hablador.priceTalkerdescription,
      //   fontSize,
      //   primeraPosicion.cordenadaX,
      //   primeraPosicion.descripcion
      // );

      // Grupo Articulo
      // label(
      //   doc,
      //   hablador.linea,
      //   fontSize,
      //   primeraPosicion.cordenadaX,
      //   primeraPosicion.grupoArticulo
      // );

      // Ubicación
      // label(
      //   doc,
      //   hablador.galpon,
      //   fontSize,
      //   primeraPosicion.cordenadaX,
      //   primeraPosicion.ubicacion
      // );
    }

    // // Segunda Posición
    // else if (conVueltas == 1) {
    // }

    // // Tercera Posición
    // else if (conVueltas == 2) {
    // } else {
    //   console.error("Valor no contemplado");
    // }

    if (conVueltas >= 2) {
      conVueltas = 0;
    }
  });

  doc.end();
};

module.exports = {
  habladorP2,
};
