// ESTATUS DE RESPUESTA DE VARIBLE [pandulce].
// 0 --> VALOR POR DEFECTO.
// 1 --> RESPUESTA POSITIVA.
// 2 --> RESPUESTA CON ERROR.
const fileSystem = require("fs");
const ruta = require("../routes/uploads/index");

// NOMBRE ESTATICO PARA EL CAMBIO DE LOGO
const oldLogo = "LOGO_DAKA_PROMO_ACTUAL.png";
// const ruta = "//192.168.21.126/Publico/DevTEC-AL-0001/image/";
var pandulce = 0;

function changeLogo(newLogo) {
    try {
        //fileSystem.unlinkSync(`${ruta}/${oldLogo}`); // ELIMINA ESTE ARCHIVO.
        fileSystem.renameSync(`${ruta}/${newLogo}`,`${ruta}/${oldLogo}`);  // CAMBIA EL NOMBRE DEL ARCHIVO CREADO POR "[oldLogo]".
        pandulce = 1;
        return pandulce;
    } catch (error) {
        return pandulce = 2;
    }
}

module.exports = { changeLogo };


