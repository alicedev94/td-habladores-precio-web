let data = [
  {
    product: {
      codigo_relacion: 1,
      precio: 68.1,
    },
    details: [
      {
        codigo_relacion: 0,
        precio: 19,
      },
      {
        codigo_relacion: 1,
        precio: 100,
      },
    ],
  },
    {
      product: {
        codigo_relacion:  1,
        precio: 68.1,
      },
      details: [
        {
          codigo_relacion: 1,
          precio: 19,
        },
        {
          codigo_relacion: 0,
          precio: 100,
        },
      ],
    },
];

var precio = 0;

let promise = data.forEach((dato, index) => {
  if (dato.product.codigo_relacion == 1) {
    // SUMAR PRECIOS
    dato.details.forEach((dato_detalle, index) => {
      if (dato_detalle.codigo_relacion == 1)
        dato.product.precio += dato_detalle.precio;
        precio = dato.product.precio;
        console.log(index);
    });
  }
  console.log(precio);
  precio = 0;
});



