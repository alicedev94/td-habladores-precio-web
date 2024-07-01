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
  return data;
};

const armaCombo = async (codigo_relacion) => {
  // ESTO SE TIENE QUE EJECUTAR DE MANERA INDIVIDUAL POR COMPO, DE ESA MANERA PUEDO RELACIONAR DE FORMA SEPARADA
  const combo = await sequelize.query(` 
  SELECT DISTINCT TOP (1000) 
  [ItemCode] as Codigo
     ,[Nombre]
     ,[Marca]
     ,[Garantia]
     ,[CodigoBarra]
     ,[PrecioaMostrar]
     ,[PrecioTachado]
     ,[Lista Precio] ListaPrecio
     ,[FecCrea]
     ,[Codigo_relacion]
     ,[Codigo_suma_resta]
     FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresCombos]
   where Codigo_relacion =  '${codigo_relacion}.1'`);

      return combo;
};

// NUEVA CONSULTA PARA PROMO DAKA (COMBOS)
const nuevoCombo = async () => {
  const response = await sequelize.query(`SELECT TOP (1000) 
  [ItemCode] as Codigo
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
     ,[Lista Precio] ListaPrecio
     ,[IdHablador]
     ,[Hablador]
     ,[IdMotivo]
     ,[FecCrea]
     ,[CodigoServicio]
     ,[PrecioServicio]
     ,[Codigo_relacion]
     ,[Codigo_suma_resta]
     FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresCombos]
   where Codigo_relacion = '1' and CodigoSucursal = 4`);
  return response;
}; 

module.exports = { comboDaka, armaCombo, nuevoCombo};
