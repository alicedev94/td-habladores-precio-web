// -- LIBRERÍAS --
const PDFDocument = require("pdfkit");
const path = require("path");

const priceTalkerSuperMarket = () => {
  // -- PRICE --
  doc
    .font(
      path.join(
        priceTalkerFontPath,
        "node_modules",
        "@canvas-fonts",
        "arial-bold",
        "Arial Bold.ttf"
      )
    )
    .fontSize(45)
    .text("$ 100, 00", 100, 100, {
      width: 30,
      align: "center",
    });
};

module.exports = {
    priceTalkerSuperMarket
}
