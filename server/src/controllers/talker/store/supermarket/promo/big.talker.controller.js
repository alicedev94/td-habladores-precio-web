const PDFDocument = require("pdfkit");
const path = require("path");
const { validarTachado } = require("../../../funciones.hablador");
const { label } = require("../../../../pdf-label/src/index");
const { withIva } = require("../../prices/main");
const { cOut } = require("../../prices/crossedOut");
const { generarPrecio, generarPrecioSin99 } = require("../../../funciones.hablador");

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

const bigCodDetalleX = 517.8; /* Codido detalle */
const bigCodDetalleY = 350.55;

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

        if (index != 0 && index < 3) {
          if (index == 1) {
            var codDetail = `${detail.Codigo} /`;
          } else {
            var codDetail = `${detail.Codigo}`;
          }

          // Codigos relaciones
          label(
            doc,
            font,
            bigFontSize,
            codDetail,
            bigCodDetalleX + yOffset,
            bigCodDetalleY,
            {
              width: widthText,
              align: "left",
            }
          );

          yOffset += 140; // Incrementamos el desplazamiento para el siguiente detalle
        }
      });

      // PRECIO
      // dato.product.PrecioaMostrar = dato.product.PrecioaMostrar + precioDetalle;

      /* Toda la logica detras del precio */
      let { IdHablador, PrecioaMostrar, PrecioTachado } = dato;

      // let precioIva = withIva(IdHablador, PrecioaMostrar)
      // let tachadoIva = withIva(IdHablador, dato.PrecioTachado)

      var precio = generarPrecioSin99(PrecioaMostrar + precioDetalle, list);
      var precioIva = generarPrecio(PrecioaMostrar + precioDetalle, list);
      var tachadoIva = generarPrecioSin99(PrecioTachado + precioDetalle, list);
      var fullTachado = cOut(parseFloat(tachadoIva), parseFloat(precio), 0);
  
      // Precio full
      label(doc, font, fontPrecio, precioIva, bigPrecioX - 90, bigPrecioY, {
        width: widthText + 10,
        height: heightText,
        align: "center",
      });

      // Precio tachado
      label(
        doc,
        font,
        fontPrecioTachado,
        fullTachado,
        bigPrecioTachadoX - 100,
        bigPrecioTachadoY,
        {
          width: widthText,
          height: heightText,
          align: "center",
        }
      );
    } else {


      let centar = 30;
      let ajuste = 30;

      // Codigo
      label(
        doc,
        font,
        bigFontSize,
        dato.Codigo,
        bigCodigoX,
        bigCodigoY + centar,
        {
          width: widthText,
          align: "center",
        }
      );

      // Descripcion articulo
      label(doc, font, bigFontSize, dato.Nombre, bigDesX, bigDesY + centar, {
        width: 260,
        height: heightText + ajuste,
        align: "center",
      });

      // Descripcion articulo
      label(
        doc,
        font,
        bigFontSize,
        `Tiempo de grantía ${dato.Garantia} días`,
        bigDesX,
        bigDesY + centar + 80,
        {
          width: widthText,
          height: heightText,
          align: "center",
        }
      );

      /* Toda la logica detras del precio */
      let { IdHablador, PrecioaMostrar, PrecioTachado } = dato;

      // let precioIva = withIva(IdHablador, PrecioaMostrar)
      // let tachadoIva = withIva(IdHablador, dato.PrecioTachado)

      var precio = generarPrecioSin99(PrecioaMostrar + precioDetalle, list);
      var precioIva = generarPrecio(PrecioaMostrar + precioDetalle, list);
      var tachadoIva = generarPrecioSin99(PrecioTachado + precioDetalle, list);
      var fullTachado = cOut(parseFloat(tachadoIva), parseFloat(precio), 0);
  
      label(doc, font, fontPrecio, precioIva, bigPrecioX - 90, bigPrecioY, {
        width: widthText + 50,
        height: heightText,
        align: "center",
      });

      // Precio tachado
      label(
        doc,
        font,
        fontPrecioTachado,
        fullTachado,
        bigPrecioTachadoX - 100,
        bigPrecioTachadoY,
        {
          width: widthText,
          height: heightText,
          align: "center",
        }
      );
    }
  });

  vuelta = 0;
  precioDetalle = 0;
  doc.end();
};

module.exports = {
  habladorPromoG,
};
