// Script para la creacion de la carpeta si no existe
const fs = require("fs");

const createFolder = (carpeta) => {
  const ruta = `${process.env.USERPROFILE}/Documents/${carpeta}`;

  if (fs.existsSync(ruta)) {
    console.log(`La carpeta ${carpeta} ya existe`);
    return true;
  } else {
    fs.mkdir(ruta, (err) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        console.log(`La carpeta ${carpeta}  se creó correctamente`);
        return true;
      }
    });
  }
};

module.exports = {
  createFolder,
};
