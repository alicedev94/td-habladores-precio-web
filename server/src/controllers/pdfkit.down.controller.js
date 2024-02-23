const PDFDocument = require("pdfkit");

const buildPdf = (dataCallback, endCallback) => {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.text("Hello World");

  doc.end();
};

module.exports = { buildPdf };
