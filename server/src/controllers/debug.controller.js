// const moment = require('moment-timezone');
// let horaVenezuela = moment().tz("America/Caracas").format();
const fs = require("fs");

const createFolder = (carpeta) => {
  const ruta = `${process.env.USERPROFILE}/Documents/${carpeta}`;

  if (fs.existsSync(ruta)) {
    console.log(`La carpeta ${carpeta} ya existe`);
  } else {
    fs.mkdir(ruta, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`La carpeta ${carpeta}  se creó correctamente`);
      }
    });
  }
};

module.exports = {
  createFolder,
};
