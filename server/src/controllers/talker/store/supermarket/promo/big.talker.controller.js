const PDFDocument = require("pdfkit");
const path = require("path");
const { validarTachado } = require("../../../funciones.hablador");
const { label } = require("../../../../pdf-label/src/index");

var precio = 0;
var precioDetalle = 0;
let priceTalkerPositionPriceX = 226.77;
let priceTalkerPositionPriceY = 219.21; 
const priceTalkerFontSizePrice = 72;
const priceTalkerFontPath = process.cwd();

const validarDatos = (datos) => {
  const tieneProduct = datos.some((item) => item.hasOwnProperty("product"));
  return tieneProduct;
};

/* Nuevo */

// Globales
const font = path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf");

const bigFontSize = 18;
const fontPrecio = 100;
const fontPrecioTachado = 72;

const widthText = 283.46;
const heightText = 70;

// Por componente

const bigCodigoX = 517.41; /* Codigo */
const bigCodigoY = 210.31;

const bigDesX = 517.8; /* Descripcion */
const bigDesY = 240.31;

const bigSimboX = 517.8; /* Simbolo */
const bigSimboY = 285.67;

const bigPrecioX = 340.16; /* Precio */
const bigPrecioY = 354.8;

const bigPrecioTachadoX = 226.77; /* Precio tachado */
const bigPrecioTachadoY = 268.35;

const habladorPromoG = async (inicio, fin, datos, list, datosRelacionados) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  doc.on("data", inicio);
  doc.on("end", fin);

  const combo = validarDatos(datosRelacionados);

  datosRelacionados.forEach(async (dato, index) => {
    if (index > 0) {
      doc.addPage({ size: "A4", layout: "landscape" });
    }
    if (combo) {
      // Codigo
      label(
        doc,
        font,
        bigFontSize,
        dato.product.Codigo,
        bigCodigoX,
        bigCodigoY,
        {
          width: widthText,
          align: "center",
        }
      );

      // Descripcion articulo
      label(doc, font, bigFontSize, dato.product.Nombre, bigDesX, bigDesY, {
        width: widthText,
        height: heightText,
        align: "center",
      });

      // Simbolo +
      label(doc, font, bigFontSize, "+", bigSimboX, bigSimboY, {
        width: widthText,
        align: "center",
      });

      // DETALLE DEL PRODUCTO (PRODUCTO RELACIONADO)

      // CODIGO DEL DETALLE
      let yOffset = 0; // Este será nuestro desplazamiento en el eje y
      let vuelta = 0;
      dato.details.forEach((detail, index) => {
        // ESTO NO DEBERIA ESTAR ACA

        if (detail.Codigo_suma_resta == 1) {
          precioDetalle += detail.PrecioaMostrar;
        }

        // precio += detail.PrecioaMostrar;

        // DESCRIPCION SEGUNDO ARTICULO
        if (vuelta === 0) {
          doc
            .font(
              path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf")
            )
            .fontSize(18)
            .text(
              `${detail.Codigo} ${detail.Nombre}`,
              priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46,
              priceTalkerPositionPriceY + 30 + 10 - 18.9 + 30.24 + 30.24,
              {
                width: 283.46,
                height: 70,
                align: "center",
              }
            );
          vuelta++;
        } else {
          console.log("solo tomammos el primer articulo..");
        }
        // CODIGOS RELACIONADOS
        console.log("Detail codigo", detail.Codigo)
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(18)
          .text(
         
            `${detail.Codigo}/`,
            priceTalkerPositionPriceX + 113.39 + 151.18 + 26.46 + yOffset,
            priceTalkerPositionPriceY + 110 + 10 - 18.9 + 30.24,
            {
              width: 283.46,
              align: "left",
            }
          );
        yOffset += 150; // Incrementamos el desplazamiento para el siguiente detalle
      });

      // PRECIO
      dato.product.PrecioaMostrar = dato.product.PrecioaMostrar + precioDetalle;

      if (dato.product["Lista Precio"] != "3") {
        // SCRIPT
        // CON .99
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (dato.product["Lista Precio"] != "1") {
          // CUALQUIER OTRA LISTA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          if (dato.product.PrecioaMostrar < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(dato.product.PrecioaMostrar);
            precio = precio.toString().replace(".", ",");
            precio = Math.round(precio);
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(dato.product.PrecioaMostrar * 1.16); // dato.product.PrecioaMostrar
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
          //
        } else {
          // LISTA PARA MARGARITA
          // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
          precio = Math.round(precio);
          if (dato.product.PrecioaMostrar < 1) {
            // 0 0,1 0,12123 etc
            precio = parseFloat(dato.product.PrecioaMostrar);
            precio = precio.toString().replace(".", ",");
          } else {
            // CUALQUIER OTRA LISTA
            precio = parseFloat(dato.product.PrecioaMostrar);
            precio = Math.round(precio);
            precio = precio - 0.01;
            precio = precio.toString().replace(".", ",");
          }
          //
        }

        // FIN DEL BLOQUE DE CODIGO

        // TEMPLATE
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(100)
          .text(
            `$${precio}`,
            priceTalkerPositionPriceX + 113.39,
            priceTalkerPositionPriceY + 75.59 + 60
          );
      } else {
        // SCRIPT
        // ENTERO
        // SI LA LISTA ES MARGARITA NO LLEVA IVA
        if (product.priceTalkerList != "1") {
          // CUALQUIER OTRA LISTA
          precio = parseFloat(dato.product.PrecioaMostrar * 1.16);
          precio = Math.round(precio);
        } else {
          // LISTA PARA MARGARITA
          precio = parseFloat(dato.product.PrecioaMostrar);
          precio = Math.round(precio);
        }
        // FIN DEL BLOQUE DE CODIGO

        // TEMPLATE
        doc
          .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
          .fontSize(100)
          .text(
            `$${precio}`,
            priceTalkerPositionPriceX + 113.39,
            priceTalkerPositionPriceY + 75.59 + 60
          );
      }

      var rtaPrecio = validarTachado(
        dato.product.PrecioTachado,
        dato.product.PrecioaMostrar
      );

      // // 1 ES UN EL TACHADO ES MENOR Y ESO ESTA MAL Y 0 SIGMNIFICA QUE PROCEDE
      // if (rtaPrecio != 0) {
      //   // ERROR PRECIO TACHADO
      //   doc
      //     .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
      //     .fontSize(11)
      //     .fillColor("red")
      //     .text(
      //       "El precio tachado no es, al menos, $5 mayor que el precio de venta.", // ${precioTachado}
      //       priceTalkerPositionPriceX,
      //       priceTalkerPositionPriceY
      //     );
      // }

      // PRECIO TACHADO
      doc
        .font(path.join(priceTalkerFontPath, "fonts", "PermanentMarker.ttf"))
        .fontSize(priceTalkerFontSizePrice)
        .fillColor("black")
        .text(
          `$${dato.product.PrecioTachado}`,
          priceTalkerPositionPriceX,
          priceTalkerPositionPriceY + 11.34 + 37.8
        );
    } else {
      let centar = 30;
      let ajuste = 30;

      console.log("garantia", dato.Garantia);

      // Codigo
      label(doc, font, bigFontSize, dato.Codigo, bigCodigoX, bigCodigoY + centar, {
        width: widthText,
        align: "center",
      });

      // Descripcion articulo
      label(doc, font, bigFontSize, dato.Nombre, bigDesX, bigDesY + centar, {
        width: 260,
        height: heightText + ajuste,
        align: "center",
      });

       // Descripcion articulo
       label(doc, font, bigFontSize, `Tiempo de grantía ${dato.Garantia} días`, bigDesX, bigDesY + centar + 80, {
        width: widthText,
        height: heightText,
        align: "center",
      });

      /* Toda la logica detras del precio */

      // Precio
      label(doc, font, fontPrecio, "999,99", bigPrecioX -90, bigPrecioY, {
        width: widthText + 10,
        height: heightText,
        align: "center",
      });

      // Precio tachado
      label(doc, font, fontPrecioTachado, 120, bigPrecioTachadoX - 100, bigPrecioTachadoY, {
        width: widthText,
        height: heightText,
        align: "center",
      });
    }
  });

  vuelta = 0;
  precioDetalle = 0;
  doc.end();
};

module.exports = {
  habladorPromoG,
};
