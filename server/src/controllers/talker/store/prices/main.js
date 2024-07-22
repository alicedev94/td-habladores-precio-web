const iva = 1.16;
const decimal = 0.01;
const promo = true;

const withIva = (list, priceFull) => {
  priceFull = parseFloat(priceFull * iva);
  priceFull = Math.round(priceFull);
  if (promo) {
    priceFull = promoNinetyNine(priceFull);
  }
  console.log(parseInText(priceFull));
  return parseInText(priceFull);
};

const noIva = (list, priceFull) => {
  priceFull = Math.round(priceFull);
  if (promo) {
    priceFull = promoNinetyNine(priceFull);
  }
  return parseInText(priceFull);
};

const parseInText = (priceInt) => {
  return priceInt.toString().replace(".", ",");
};

const promoNinetyNine = (priceInt) => {
  return priceInt - decimal;
};

console.log(noIva(2, 100));

module.exports = { withIva, noIva };
