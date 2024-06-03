const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const path = require("path");
const priceTalkerFontPath = process.cwd();

const { habladorG } = require("../controllers/habladoresCdd"); // habladorM, habladorP 

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

const dataCdd = async () => {
  const response = await sequelize.query(catalogo_productos_cdd);
  return response;
};

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
    
}

const geneCdd = async (inicio, fin, datos, cantidad, ubicacion, sizeHablador) => {

  console.log(sizeHablador);

  const doc = new PDFDocument({ size: "A4", layout: "landscape" });
  habladorG(inicio, fin, datos, cantidad, ubicacion, doc);
};

module.exports = { dataCdd, geneCdd, estructuraCdd };
module.exports
