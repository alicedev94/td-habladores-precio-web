const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");
const { habladorG, habladorP, habladorM } = require("../controllers/habladoresCdd");
const { habladorP2 } = require("../controllers/small.pdf.js");

// Nuevos Modulos
// const { habladorM } = require("../controllers/habladorCddMediano");

const SIZE_SMALL = "0";
const SIZE_MEDIUM = "1";
const SIZE_LARGE = "2";

const dataCdd = async () => {
  try {
    const response = await sequelize.query(catalogo_productos_cdd);
    return response;
  } catch (error) {
    // Handle error appropriately
    console.error("Error fetching data:", error);
  }
};

const geneCdd = async (
  inicio,
  fin,
  datos,
  cantidad,
  ubicacion,
  sizeHablador
) => {
  let doc;
  try {
     switch  (sizeHablador) {
      case SIZE_SMALL:
        doc = new PDFDocument({ size: "A4", layout: "landscape" });
        // habladorP(inicio, fin, datos, cantidad, ubicacion, doc);
        const rta = await habladorP2(inicio, fin, datos, cantidad, ubicacion, doc);
        console.log(rta);
        break;
      case SIZE_MEDIUM:
        doc = new PDFDocument({ size: "A4", layout: "portrait" });
        habladorM(inicio, fin, datos, cantidad, ubicacion, doc);
        break;
      case SIZE_LARGE:
        doc = new PDFDocument({ size: "A4", layout: "landscape" });
        habladorG(inicio, fin, datos, cantidad, ubicacion, doc);
        break;
      default:
        throw new Error("Unrecognized sizeHablador value");
    }
  } catch (error) {
    // Handle error appropriately
    console.error("Error generating PDF:", error);
  }
};

module.exports = { dataCdd, geneCdd };
