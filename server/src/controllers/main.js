const sequelize = require("../lib/sequelize");
const { models } = require("../lib/sequelize");

const findAll = async () => {
  const rta = await sequelize.models.Users.findAll();
  return rta;
};

const newUser = async (data) => {
  const rta = await sequelize.models.Users.create(data);
  return rta;
};

const updateUser = async (id, data) => {
  const rta = await sequelize.models.Users.update(
    { name: data },
    {
      where: {
        id: id,
      },
    }
  );
  return rta;
};

const deleteUser = async (id) => {
  const rta = await sequelize.models.Users.destroy({
    where: {
      id: id,
    },
  });
  return rta;
};

const products = async () => {
  const rta = await sequelize.query(`
  SELECT DISTINCT top 10
  T1.[Referencia] Codigo
  ,T1.[Nombre] Nombre
  ,T5.[Marca] Marca
  ,T4.[CantidadDiasGarantia] Garantia
  ,isNull(T3.[Barra], 0) Codigo_Barra
  ,T2.[Precio] PrecioaMostrar
  ,0 PrecioTachado
  --,T6.Inventario
  --,T6.CodigoSucursal
  --,T6.Sucursal
  --,T6.CodArea
  ,T2.Cod_ListaPrecio 'Lista Precio'
  --,T6.Sucursal
  --,T6.CodArea
  FROM [DB_AWS_MELE].[dbo].[Transaccional.Productos] T1 
  INNER JOIN [DB_AWS_MELE].[dbo].[ListasPrecios] T2 ON T1.Referencia = T2.[Cod_Producto]
  INNER JOIN [DB_AWS_MELE].[dbo].[Transaccional.Empaques] T3 ON T1.[IdProducto] = T3.[IdProducto]
  INNER JOIN [DB_AWS_MELE].[dbo].[ProductosGarantias] T4 ON T1.[Referencia] = T4.[Cod_Producto]
  INNER JOIN [DB_AWS_MELE].[dbo].[Marcas] T5 ON T4.[Cod_Marca] = T5.[Cod_Marca]
  INNER JOIN [TIENDAS_MELE].[dbo].[TM_VW_ExistenciaTiendasMele] T6 ON T2.[Cod_Producto] = T6.[CodArticulo]
  WHERE T1.[Referencia] LIKE 'l%' --AND T2.Cod_ListaPrecio = 2  --and T6.CodigoSucursal = 4`);

  //console.log(rta);
  return rta;
};

const processData = async (data) => {
  const sku = data.sapCode[0].flat();

  const modSku = sku.map((elemento) => {
    return `'${elemento}'`;
  });

  const rta = await sequelize.query(`
  SELECT DISTINCT
    T1.[Referencia] Codigo
    ,T1.[Nombre] Nombre
    ,T5.[Marca] Marca
    ,T4.[CantidadDiasGarantia] Garantia
    ,isNull(T3.[Barra], 0) Codigo_Barra
    ,T2.[Precio] PrecioaMostrar
    ,0 PrecioTachado
    -- ,T6.Inventario
    --,T6.CodigoSucursal
		--,T6.Sucursal
		--,T6.CodArea
		,T2.Cod_ListaPrecio 'Lista Precio'
	  --,T6.Sucursal
	  --,T6.CodArea
  FROM [DB_AWS_MELE].[dbo].[Transaccional.Productos] T1 
  INNER JOIN [DB_AWS_MELE].[dbo].[ListasPrecios] T2 ON T1.Referencia = T2.[Cod_Producto]
  INNER JOIN [DB_AWS_MELE].[dbo].[Transaccional.Empaques] T3 ON T1.[IdProducto] = T3.[IdProducto]
  INNER JOIN [DB_AWS_MELE].[dbo].[ProductosGarantias] T4 ON T1.[Referencia] = T4.[Cod_Producto]
  INNER JOIN [DB_AWS_MELE].[dbo].[Marcas] T5 ON T4.[Cod_Marca] = T5.[Cod_Marca]
  INNER JOIN [TIENDAS_MELE].[dbo].[TM_VW_ExistenciaTiendasMele] T6 ON T2.[Cod_Producto] = T6.[CodArticulo]
  WHERE T1.[Referencia] IN (${modSku}) AND T2.Cod_ListaPrecio = 2  and T6.CodigoSucursal = 4`);

  return rta;
};

const stateData = () => {
  const data = [
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 75.86,
      PrecioTachado: 0,
      "Lista Precio": "4",
    },
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 82.75,
      PrecioTachado: 0,
      "Lista Precio": "3",
    },
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 82.75,
      PrecioTachado: 0,
      "Lista Precio": "7",
    },
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 96.55,
      PrecioTachado: 0,
      "Lista Precio": "10",
    },
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 103.44,
      PrecioTachado: 0,
      "Lista Precio": "9",
    },
    {
      Codigo: "LB-00000001",
      Nombre: "MICROONDA 1.4 PIE ACERO INOX. CNEGRO MS402MADXBB SAMSUNG",
      Marca: "SAMSUNG",
      Garantia: 365,
      Codigo_Barra: "8806085002111",
      PrecioaMostrar: 124.13,
      PrecioTachado: 0,
      "Lista Precio": "6",
    },
  ];
  return data;
};

const priceTalkerData = [];
const modelData = (data) => {
  data.map((item) => {
    priceTalkerData.push({
      priceTalkerBrand: item.Marca,
      priceTalkerdescription: item.Nombre,
      priceTalkerPrice: item.PrecioaMostrar,
      priceTalkerSapCode: item.Codigo,
      priceTalkerBarCode: item.Codigo_Barra,
      priceTalkerWarranty: item.Garantia,
    });
  });

  return priceTalkerData;
};

module.exports = {
  findAll,
  newUser,
  deleteUser,
  updateUser,
  products,
  processData,
  stateData,
  modelData,
};
