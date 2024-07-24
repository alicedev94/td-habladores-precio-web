const generarPrecio = (precio, listaPrecio) => {
  // SI LA LISTA ES MARGARITA NO LLEVA IVA
  if (listaPrecio != "1") {
    // CUALQUIER OTRA LISTA
    // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
    if (precio < 1) {
      precio = parseFloat(precio);
      precio = Math.round(precio);
      precio = precio.toString().replace(".", ",");
    } else { 
      // CUALQUIER OTRA LISTA
      precio = parseFloat(precio * 1.16);
      precio = Math.round(precio);
      precio = precio - 0.01;
      precio = precio.toString().replace(".", ",");
    }
  } else {
    // LISTA PARA MARGARITA
    // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
    if (precio < 1) {
      precio = parseFloat(precio);
      precio = Math.round(precio);
      precio = precio.toString().replace(".", ",");
    } else {
      // CUALQUIER OTRA LISTA
      precio = parseFloat(precio);
      precio = Math.round(precio);
      precio = precio - 0.01;
      precio = precio.toString().replace(".", ",");
    }
  }

  return precio;
  // FIN DEL BLOQUE DE CODIGO
};

const generarPrecioSin99 = (precio, listaPrecio) => {
  // SI LA LISTA ES MARGARITA NO LLEVA IVA
  if (listaPrecio != "1") {
    // CUALQUIER OTRA LISTA
    // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
    if (precio < 1) {
      precio = parseFloat(precio);
      precio = precio.toString().replace(".", ",");
      precio = Math.round(precio);
    } else { 
      // CUALQUIER OTRA LISTA
      precio = parseFloat(precio * 1.16);
      precio = Math.round(precio);
  
      precio = precio.toString().replace(".", ",");
    }
  } else {
    // LISTA PARA MARGARITA
    // EN CASO DE SER MENOR A 1 NO SE LE APLICAN CARGOS PARA QUE NO DE -0.01  Y DE 0
    if (precio < 1) {
      precio = parseFloat(precio);
      precio = Math.round(precio);
      precio = precio.toString().replace(".", ",");
    } else {
      // CUALQUIER OTRA LISTA
      precio = parseFloat(precio);
      precio = Math.round(precio);
      precio = precio.toString().replace(".", ",");
    }
  }

  return precio;
  // FIN DEL BLOQUE DE CODIGO
};

const validarTachado = (tachado, precio) => {
  // 1 ES UN ERROR Y 0 SIGMNIFICA QUE PROCEDE
  return (tachado <= precio - 5) ? 1 : 0;   // 110 110
}

const response = validarTachado(110, 110);
console.log("validar tachado: ",response);

module.exports = { generarPrecio, validarTachado, generarPrecioSin99 };
