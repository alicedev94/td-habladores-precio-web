const { sequelize } = require("../lib/sequelize");
const PDFDocument = require("pdfkit");
const catalogo_productos_cdd = require("../lib/querys/productos.cdd");


const dataCdd = async () => {
  const response = await sequelize.query(catalogo_productos_cdd);
  return response;
};

const geneCdd = async (dataCallback, endCallback, priceTalkerData) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc
  .rect(10, 10, 400, 400) // X, Y , ALTO Y ANCHO +3 para que aprezca pegado a la
  .dash(5, { space: 1 })
  .stroke();
};

module.exports = { dataCdd, geneCdd };
