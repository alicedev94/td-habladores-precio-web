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
  doc.roundedRect(x, y, ancho, alto, 2.5).stroke();
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

  let x = 0;
  let y = 0;

  let interlineadoTitulo = 50;

  // Estructura
  campos.forEach((titulo, index) => {
    // Label (doc, contenido, fontSize, x, y)
    label(doc, titulo, fontSize, 10, y);
    // console.log(y);
    // label(doc, hab, fontSize, 150, y);

    // Input (doc, ancho, alto, x, y)
    input(doc, 200, 15, 5, y);

    // Imagen (doc, ruta, imagen, ancho, alto, x, y)
    imagen(doc, rutaLogo, nombreLogo, 50, 50, 300, 0);

    // Cantidad
    if (index == 2) {
      label(doc, "cantidad:", fontSize, 300, y);
    }

    y += interlineadoTitulo;
  });

  // Unidades
  input(doc, 200, 40, 230, y - interlineadoTitulo - 25);
  label(
    doc,
    "unidades",
    fontSize,
    350,
    y - interlineadoTitulo
  );

  let primeraPosicion = {
    codigoSap: 0,
    descripcion: 50,
    grupoArticulo: 100,
    ubicacion: 150,
    cordenadaX: 150
  };

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

      console.log("Nombre", hablador);
      // Descripción
      label(
        doc,
        hablador.priceTalkerdescription,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.descripcion
      );

      // Grupo Articulo
      label(
        doc,
        hablador.linea,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.grupoArticulo
      );

      // Ubicación
      label(
        doc,
        hablador.galpon,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.ubicacion
      );
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
