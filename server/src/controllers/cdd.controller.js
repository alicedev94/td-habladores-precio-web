const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const path = require("path");
const priceTalkerFontPath = process.cwd();

// VARIBLES PARA LA PLANTILLA GRANDE DEL HABLADOR DE CDD
let n1cm = 37.8;
let divisor = 0;

let campos = ["código sap", "descripción", "grupo artículo", "ubicación"];

let reCuadroTitulo = {
  x: n1cm * 1.5,
  y: n1cm * 5,
  with: n1cm * 9.5,
  height: n1cm * 1.5,
  radio: n1cm / 3.5,
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

  doc.image(
    `${dirnameLogo}/${logoName}`,
    300,
    -20, // priceTalkerLogoPositionY
    {
      // pathLogo
      fit: [200, 200],
      align: "center",
      valign: "center",
    }
  );

  for (let index = 0; index < campos.length; index++) {
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
          "SpecifyPersonalCondensedBlack-Eg2g.ttf"
        )
      )
      .fontSize(40)
      .text(
        `${campos[index].toLocaleUpperCase()}:`,
        reCuadroTitulo.x,
        reCuadroTitulo.y + divisor,
        {
          align: "left",
        }
      ),
      // VALOR
      doc
        .roundedRect(
          reCuadroTitulo.x + (n1cm*9.5),
          reCuadroTitulo.y + divisor,
          400,
          reCuadroTitulo.height,
          reCuadroTitulo.radio
        )
        .stroke();
    // CONTROLA LA DISTASNCIA DE CADA RECUADRO POR VUELTA
    divisor += n1cm * 2;
  }

  // FIN DEL DOCUMENTO
  doc.end();
};

module.exports = { dataCdd, geneCdd };
