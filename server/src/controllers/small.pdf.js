const path = require("path");
const priceTalkerFontPath = process.cwd();

const fontSizeM = 10;
const tipoLetra = "OMEGLE.ttf";

const habladorP2 = async (inicio, fin, datos, cantidad, ubicacion, doc) => {
  doc.on("data", inicio);
  doc.on("end", fin);

   // VALOR CODIGO SAP
   doc
   .font(path.join(priceTalkerFontPath, "fonts", tipoLetra))
   .fontSize(fontSizeM)
   .text(
     `asdas`.toLocaleUpperCase(), // .toLocaleUpperCase()
     10,
     10,
     {
       align: "left",
     }
   );

   doc.end();
};

module.exports = {
  habladorP2,
};
