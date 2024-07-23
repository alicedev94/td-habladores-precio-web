const { validateCroOut } = require("../prices/main");
const increase = 1.15; // 15%

const cOut = (preciousPrice, concurrentPrice, priceDetail) => {
    let response =  validateCroOut(preciousPrice, concurrentPrice);

    if (response) {
        /* EL precio tachado es al menos 5usd mayor al precio a mostrar */ 
        var fullPrice = concurrentPrice + precioDetalle;
        let validateFullPrice = validateCroOut(preciousPrice, fullPrice);
        if (validateFullPrice) {
            /* EL precio tachado es al menos 5usd mayor al precio full a mostrar  */
            console.log("PRECIO TACHADO", preciousPrice);
            console.log("PRECIO: ", fullPrice);
            // return preciousPrice; 
        } else {
            /* El precio tachado es menor segun la condicion al precio full a mostrar */
            let priceToShow = fullPrice * increase;
            console.log("PRECIO TACHADO", priceToShow);
            console.log("PRECIO: ", fullPrice);
            // return priceToShow;
        }
    } else {
        return Math.round((precioActual + precioDetalle) * increase);
    }

    /* En caso de ser falso, validar los posibles casos */
    // return response;
};

let precioAnterior = 104; // 15% = 120
let precioActual = 100;
let precioDetalle = 30;

console.log(cOut(precioAnterior, precioActual, precioDetalle));

module.exports = { cOut };

