const iva = 1.16;
const decimal = 0.01;
const promo = true;

const withIva = (list, priceFull) => {
  console.log("priceFull",priceFull);
  priceFull = parseFloat(priceFull * iva);
  priceFull = Math.round(priceFull);
  if (promo) {
    priceFull = promoNinetyNine(priceFull);
  }
  console.log("priceFullIva",priceFull);
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

const validateCroOut = (preciousPrice, concurrentPrice) => {
  let condicion = 5;
  return (preciousPrice - concurrentPrice) >= condicion ? true : false;
};

module.exports = { withIva, noIva, validateCroOut};
