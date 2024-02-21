function ajustarCadena(cadena) {
    let palabras = cadena.split(' ');

    while (cadena.length > 75) {
        // Quita la última palabra
        palabras.pop();
        // Reconstruye la cadena
        cadena = palabras.join(' ');
    }

    return cadena;
}

let cadena = `APELERA CUADRADA EKO 40 LT CSENSOR ACERO INOXBORDE EXTRAIBLE EK9259MT40L`;
let resultado = ajustarCadena(cadena);

console.log(resultado);
