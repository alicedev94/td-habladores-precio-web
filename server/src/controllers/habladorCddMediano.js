const { estructuraCdd } = require("../controllers/habladoresCdd");

// Variables
const habladorM = (inicio, fin, datos, cantidad, ubicacion, doc) => {
  console.log("hi");

  doc.on("data", inicio);
  doc.on("end", fin);


};

module.exports = {
  habladorM,
};
