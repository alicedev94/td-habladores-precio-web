const fs = require("fs");

const carpeta = "mi-carpeta";

if (!fs.existsSync(carpeta)) {
  fs.mkdirSync(carpeta);
  console.log("La carpeta 'mi-carpeta' se creó correctamente");
} else {
  console.log("La carpeta 'mi-carpeta' ya existe");
}