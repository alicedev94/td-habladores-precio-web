const iva = 1.16;
const promotion = 1;

// TYPES PROMOTION
/*
    1 PROMO ACTUAL
    2 SE FELIZ .99
    3 SE FELIZ CON ENTERO
    4 POR APLICAR
*/

const calculateIva = (products) => {
  if (promotion !== 3) {
    // 1 PROMO ACTUAL
    // 2 SE FELIZ .99
    products.forEach((product) => {
      product.priceTalkerPrice =
        Math.ceil(product.priceTalkerPrice * iva) - 0.01;
    });
  } else {
    // 3 SE FELIZ CON ENTERO
    products.forEach((product) => {
      product.priceTalkerPrice = Math.ceil(product.priceTalkerPrice * iva);
    });
  }

  return products;
};

module.exports = { calculateIva };
