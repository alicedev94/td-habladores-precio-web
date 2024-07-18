const path = require("path");
const discoLocalC = process.cwd();

const fontSize = 16;
const tipoLetra = "OMEGLE.ttf";

let n1cm = 26.6;

let campos = ["CODIGO SAP:", "DESCRIPCION:", "GRUPO ARTICULO:", "UBICACION:"];

const label = (doc, contenido, fontSize, x, y) => {
  doc
    .font(path.join(discoLocalC, "fonts", tipoLetra))
    .fontSize(fontSize)
    .text(contenido, x, y, {
      align: "left",
      width: 180,
      height: 40,
    });
};

const input = (doc, ancho, alto, x, y) => {
  doc.roundedRect(x, y, ancho, alto, 4).stroke();
};

// linea divisora. (x, y, longitud, x)
const lineaHorizontal = (doc, x, y, longitud) => {
  doc.moveTo(y, x).lineTo(longitud, x);
};

const estructura = (doc, x, y, interlineadoTitulo) => {
  campos.forEach((titulo, index) => {
    // Label (doc, contenido, fontSize, x, y)
    label(doc, titulo, fontSize, x, y + 12.5);

    // Campo Titulo
    // Input (doc, ancho, alto, x, y)
    input(doc, 145, 40, 40, y);

    // Campo valor
    // Input (doc, ancho, alto, x, y)
    input(doc, 200, 40, 190, y);

    // Imagen (doc, ruta, imagen, ancho, alto, x, y)
    if (index == 0) {
      imagen(doc, rutaLogo, nombreLogo, 80, 80, 450, y);
    }

    // Cantidad
    if (index == 2) {
      label(doc, "cantidad:".toLocaleUpperCase(), fontSize, 425, y - 20);
    }

    if (index == 3) {
      // Unidades
      label(doc, "unidades".toLocaleUpperCase(), fontSize, 350 + 100, y + 20);
      input(doc, 140, 100, 395, y - 60);
    }

    y += interlineadoTitulo;
  });
};

// LOGO DIRECCION DE LOGO DINAMICO
const rutaLogo = require("../../../routes/uploads/index");
var nombreLogo = "LODO_DAKA_REDONDO.png";

const imagen = (doc, ruta, imagen, ancho, alto, x, y) => {
  doc.image(`${ruta}/${imagen}`, x, y, {
    fit: [alto, ancho],
    align: "center",
    valign: "center",
  });
};

const habladorP2 = async (inicio, fin, datos, cantidad, ubicacion, doc) => {
  doc.on("data", inicio);
  doc.on("end", fin);

  let x = 50;
  let y = 40;

  let interlineadoTitulo = 60;

  let primeraPosicion = {
    codigoSap: 40 + 13,
    descripcion: 100 + 5,
    grupoArticulo: 160 + 13,
    ubicacion: 233,
    cantidadY: 200,
    cantidadX: 425,
    cordenadaX: 150 + 60,
  };

  // Iteración del hablador
  let conVueltas = 0;
  datos.map((hablador) => {
    if (conVueltas > 2) {
      doc.addPage({ size: "A4" });
      conVueltas = 0;
    }
    // Primera Posición
    if (conVueltas == 0) {
      //doc y, x, longitud
      lineaHorizontal(doc, n1cm*7.7+y+15, 0, 800);

      // Estructura (doc, x, y, interlineadoTitulo)
      estructura(doc, x, y, interlineadoTitulo);

      // Código Sap
      label(
        doc,
        hablador.priceTalkerSapCode.toLocaleUpperCase(),
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.codigoSap
      );

      // Descripción
      label(
        doc,
        hablador.priceTalkerdescription,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.descripcion
      );

      // Grupo Articulo
      label(
        doc,
        hablador.linea.toLocaleUpperCase(),
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.grupoArticulo
      );

      // Ubicación
      label(
        doc,
        hablador.galpon,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.ubicacion
      );

      // Cantidad
      label(
        doc,
        hablador.cantidad,
        30,
        primeraPosicion.cantidadX,
        primeraPosicion.cantidadY
      );

      conVueltas++;
    }

    // // Segunda Posición
    else if (conVueltas == 1) {
       //doc y, x, longitud
       lineaHorizontal(doc, n1cm*14.14+y*2+59, 0, 800);

      // Estructura (doc, x, y, interlineadoTitulo)
      estructura(doc, x, n1cm * 7.7 + y + 50, interlineadoTitulo);
      // Código Sap
      label(
        doc,
        hablador.priceTalkerSapCode.toLocaleUpperCase(),
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.codigoSap + (n1cm * 9.6)
      );

      // // Descripción
      label(
        doc,
        hablador.priceTalkerdescription,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.descripcion + (n1cm * 9.6)
      );

      // Grupo Articulo
      label(
        doc,
        hablador.linea.toLocaleUpperCase(),
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.grupoArticulo + (n1cm * 9.6)
      );

      // Ubicación
      label(
        doc,
        hablador.galpon,
        fontSize,
        primeraPosicion.cordenadaX,
        primeraPosicion.ubicacion + (n1cm * 9.6)
      );

      // Cantidad
      label(
        doc,
        hablador.cantidad,
        30,
        primeraPosicion.cantidadX,
        primeraPosicion.cantidadY + (n1cm * 9.6)
      );

      conVueltas++;
    }

    // // Tercera Posición
    else if (conVueltas == 2) {
      estructura(doc, x, n1cm * 14.14 + y * 2 + 90, interlineadoTitulo);

         //doc y, x, longitud
         lineaHorizontal(doc, n1cm*14.14+y*2+59, 0, 800);

         // Estructura (doc, x, y, interlineadoTitulo)
         estructura(doc, x, n1cm * 7.7 + y + 50, interlineadoTitulo);
         // Código Sap
         label(
           doc,
           hablador.priceTalkerSapCode.toLocaleUpperCase(),
           fontSize,
           primeraPosicion.cordenadaX,
           primeraPosicion.codigoSap + ((n1cm * 9.6) * 1.98)
         );
   
         // // Descripción
         label(
           doc,
           hablador.priceTalkerdescription,
           fontSize,
           primeraPosicion.cordenadaX,
           primeraPosicion.descripcion + ((n1cm * 9.6) * 1.98)
         );
   
         // Grupo Articulo
         label(
           doc,
           hablador.linea.toLocaleUpperCase(),
           fontSize,
           primeraPosicion.cordenadaX,
           primeraPosicion.grupoArticulo + ((n1cm * 9.6) * 1.98)
         );
   
         // Ubicación
         label(
           doc,
           hablador.galpon,
           fontSize,
           primeraPosicion.cordenadaX,
           primeraPosicion.ubicacion + ((n1cm * 9.6) * 1.98)
         );
   
         // Cantidad
         label(
           doc,
           hablador.cantidad,
           30,
           primeraPosicion.cantidadX,
           primeraPosicion.cantidadY + ((n1cm * 9.6) * 1.98)
         );

      conVueltas++;
      // doc.addPage({ size: "A4" });
    } 
  });

  doc.end();
};

module.exports = {
  habladorP2,
};
