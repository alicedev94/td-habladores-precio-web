// Script para capturar la fecha y hora actuales y guardarla en una variable
// const moment = require('moment-timezone');
// let horaVenezuela = moment().tz("America/Caracas").format();

// Script para la creacion de la carpeta si no existe
// const fs = require("fs");

// const createFolder = (carpeta) => {
//   const ruta = `${process.env.USERPROFILE}/Documents/${carpeta}`;

//   if (fs.existsSync(ruta)) {
//     console.log(`La carpeta ${carpeta} ya existe`);
//   } else {
//     fs.mkdir(ruta, (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(`La carpeta ${carpeta}  se creó correctamente`);
//       }
//     });
//   }
// };

// module.exports = {
//   createFolder,
// };

// Script saber porque parte del arreglo he pasado
const developers = [
  {
    priceTalkerBrand: "GATEWAY",
    priceTalkerdescription:
      "LAPTOP 14.1 PULG i3-1005G1 1.2GHZ 4GB RAM 128GB MEMORIA SSD BT WIN 10 CPURPURA GWTN1413PR GATEWAY",
    priceTalkerPrice: 396.55,
    priceTalkerSapCode: "LD-00001234",
    priceTalkerBarCode: "812550032895",
    priceTalkerWarranty: 365,
  },
  {
    priceTalkerBrand: "BREMEN",
    priceTalkerdescription:
      "FREIDORA DE AIRE DIGITAL CBLANCO BREAFW5009 BREMEN",
    priceTalkerPrice: 43.1,
    priceTalkerSapCode: "LH-00000749",
    priceTalkerBarCode: "10100007700",
    priceTalkerWarranty: 365,
  },
];

let contador = 0;

developers.forEach((item, index) => {
  // index 3 contador 0
  if (contador > 3) {
    console.log("New Page");
    contador = 0;
  }
  if (contador == 0) {
    console.log("PRIMERA POSICION");
  } else if (contador == 1) {
    console.log("SEGUNDA POSICION");
  } else if (contador == 2) {
    console.log("TERCERA POSICION");
  } else if (contador == 3) {
    console.log("CUARTA POSICION");
  }
  contador++;
});
contador = 0;

// codigo optimizado
// const positions = [
//   "PRIMERA POSICION",
//   "SEGUNDA POSICION",
//   "TERCERA POSICION",
//   "CUARTA POSICION",
// ];

// developers.forEach((item, index) => {
//   // index 3 contador 0
//   if (index % 4 === 0) {
//     console.log("New Page");
//   }
//   console.log(positions[contador]);
//   contador = (contador + 1) % 4;
// });
