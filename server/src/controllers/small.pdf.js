const path = require("path");
const priceTalkerFontPath = process.cwd();

const fontSizeM = 10;
const tipoLetra = "OMEGLE.ttf";

let campos = [
  "CODIGO SAP:",
  "DESCRIPCION:",
  "GRUPO ARTICULO:",
  "UBICACION:",
  "CANTIDAD:",
];

const label = (doc, contenido, fontSize, x, y) => {
  doc
    .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
    .fontSize(fontSize)
    .text(contenido.toLocaleUpperCase(), x, y, {
      align: "left",
    });
};

const input = (doc, ancho, alto, x, y) => {
  doc.roundedRect(x, y, ancho, alto).stroke();
};

const habladorP2 = async (inicio, fin, datos, cantidad, ubicacion, doc) => {
  doc.on("data", inicio);
  doc.on("end", fin);

  let x = 0;
  let y = 0;

  let interlineadoTitulo = 40;

  campos.forEach((titulo) => {
    // Label (doc, contenido, fontSize, x, y)
    label(doc, titulo, 25, 10,  y);
    label(doc, "valor", 25, 150,  y);

    // Input (doc, ancho, alto, x, y)
    input(doc, 200, 50, 10, y);

    y += interlineadoTitulo;
  });

  separador = 0;

  doc.end();
};

module.exports = {
  habladorP2,
};
