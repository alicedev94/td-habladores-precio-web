const catalogo_productos_cdd = 
`SELECT TOP 1
[ItemCode] AS Codigo,
[descripcion] AS Nombre,
[cod_marca],
[marca] AS Marca,
[codgrupo],
[grupo],
100 AS Garantia,
200 AS PrecioaMostrar,
300 AS PrecioTachado,
400 AS CodigoSucursal,
500 AS Sucursal,
600 AS IdAlmacen,
700 AS Almacen,
800 AS ListaPrecio,
900 AS IdHablador,
1000 AS Hablador,
10001 AS IdMotivo,
10002 AS FecCrea,
111 AS CodigoServicio,
100 AS PrecioServicio
FROM 
[HABLADOR_PRECIO_DEV].[dbo].[catalogo_productos_cdd]
`;

module.exports = catalogo_productos_cdd;