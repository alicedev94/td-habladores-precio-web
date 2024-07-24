const { sequelize } = require("../lib/sequelize"); // sequelize120

const armaCombo = async (codigo_relacion, lista_precio, codigo_sucursal) => {
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
   where Codigo_relacion =  '${codigo_relacion}.1' and [Lista Precio] = '${lista_precio}' and CodigoSucursal = '${codigo_sucursal}'`);

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

module.exports = {  armaCombo, nuevoCombo};
