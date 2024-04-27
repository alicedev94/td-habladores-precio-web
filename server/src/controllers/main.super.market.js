const { sequelize } = require("../lib/sequelize"); // sequelize120

const comboDaka = async (products) => {
  var data = [];
  const productos_seleccionados =
    await sequelize.query(`SELECT TOP (1000) [Codigo]
  ,[Nombre]
  ,[Marca]
  ,[Garantia]
  ,[CodigoBarra]
  ,[PrecioaMostrar]
  ,[PrecioTachado]
  ,[CodigoSucursal]
  ,[Sucursal]
  ,[IdAlmacen]
  ,[Almacen]
  ,[Lista Precio]
  ,[IdHablador]
  ,[Hablador]
  ,[IdMotivo]
  ,[FecCrea]
  ,[CodigoServicio]
  ,[PrecioServicio]
  ,[Codigo_relacion]
  ,[Codigo_suma_resta]
  FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas_supermercado]
  where Codigo in ('lb-00000006', 'lb-00000320') and [FecCrea] = (SELECT MAX(FecCrea) 
  FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas_supermercado])`);

  productos_seleccionados[0].map((obj) => {
    data += armaCombo(obj.Codigo_relacion);
  });
  //   const { Codigo_relacion, Codigo_suma_resta } = producto_seleccionado[0][0];

  //   const data = { data: response[0], Codigo_suma_resta: Codigo_suma_resta };

  // ESTO RETORNA UN JSON DEPENDIENDO DE LA CANTIDAD DE ARTICULOS Y SI SUMA O RESTA
  console.log(data);
  return data;
};

const armaCombo = async (codigo_relacion) => {
  // ESTO SE TIENE QUE EJECUTAR DE MANERA INDIVIDUAL POR COMPO, DE ESA MANERA PUEDO RELACIONAR DE FORMA SEPARADA
  const combo = await sequelize.query(` 
     SELECT TOP (1000) [Codigo]
      ,[Nombre]
      ,[Marca]
      ,[Garantia]
      ,[CodigoBarra]
      ,[PrecioaMostrar]
      ,[PrecioTachado]
      ,[CodigoSucursal]
      ,[Sucursal]
      ,[IdAlmacen]
      ,[Almacen]
      ,[Lista Precio]
      ,[IdHablador]
      ,[Hablador]
      ,[IdMotivo]
      ,[FecCrea]
      ,[CodigoServicio]
      ,[PrecioServicio]
      ,[Codigo_relacion]
      ,[Codigo_suma_resta]
      FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas_supermercado]
      where Codigo_relacion like '%${codigo_relacion}.1%'
      and [FecCrea] = (SELECT MAX(FecCrea)
      FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas_supermercado])`);

      return combo;
  // console.log(combo);
};

module.exports = { comboDaka, armaCombo};
