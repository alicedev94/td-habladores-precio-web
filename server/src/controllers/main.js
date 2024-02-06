const sequelize = require("../lib/sequelize");

const findAll = async () => {
  const rta = await sequelize.models.Users.findAll();
  return rta;
};

const findByEmail = async (email) => {
  const rta = await sequelize.models.Users.findOne({
    where: {
      email: email,
    },
  });
  return rta;
};

const newUser = async (data) => {
  const rta = await sequelize.models.Users.create(data);
  return rta;
};

const newList = async (list) => {
  const rta = await sequelize.models.List.create(list);
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

const products = async (list, type, sucur) => {
  const rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
        ,[Nombre]
        ,[Marca]
        ,[Garantia]
        ,[Codigo_Barra]
        ,[PrecioaMostrar]
        ,[IdHablador]
    FROM [HABLADOR_PRECIO_DEV].[dbo].[DK_VW_Habladores]
    WHERE  CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo like 'L%'
 `);

  //console.log(rta);
  return rta;
};

const processData = async (data, list, sucur) => {
  const sku = data.sapCode[0].flat();

  const modSku = sku.map((elemento) => {
    return `'${elemento}'`;
  });

const rta = await sequelize.query(`
  SELECT DISTINCT [Codigo]
  ,[Nombre]
  ,[Marca]
  ,[Garantia]
  ,[Codigo_Barra]
  ,[PrecioaMostrar]
  FROM [HABLADOR_PRECIO_DEV].[dbo].[DK_VW_Habladores]
  WHERE  CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo IN (${modSku})`);

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

let priceTalkerData = [];

const modelData = (data) => {
  priceTalkerData = [];

  console.log(data);

  data.map((item) => {
    priceTalkerData.push({
      priceTalkerBrand: item.Marca,
      priceTalkerdescription: item.Nombre,
      priceTalkerPrice: item.PrecioaMostrar,
      priceTalkerSapCode: item.Codigo,
      priceTalkerBarCode: item.Codigo_Barra,
      priceTalkerWarranty: item.Garantia,
      priceTalkerIdHablador: item.IdHablador
    });
  });

  return priceTalkerData;
};

const priceList = async () => {
  const rta = await sequelize.models.List.findAll();
  return rta;
};

// let list =
// {
//   title: "Lista Especial",
//   value: 11
// }
// newList(list)

module.exports = {
  findAll,
  newUser,
  deleteUser,
  updateUser,
  products,
  processData,
  stateData,
  modelData,
  findByEmail,
  priceList,
};
