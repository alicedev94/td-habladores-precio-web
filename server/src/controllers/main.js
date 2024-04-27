const { sequelize } = require("../lib/sequelize"); // sequelize120
const axios = require("axios");
const { comboDaka } = require("../controllers/main.super.market");

// 120 querys
const testConnectionFrom120 = async () => {
  const rta = await sequelize.query(`
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
         ,[CodigoServicio]
      ,[PrecioServicio]
    ,[Hablador]
    ,[IdMotivo]
    ,[FecCrea]
  FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]`);

  console.log(rta);
};

// testConnectionFrom120();
// ---

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

// newUser ({email: "sucursalvalera@tiendasdaka.com", password: "Daka34valera", rol: "ADMIN", idSucursal: "34"})

const newSucur = async (sucur) => {
  const rta = await sequelize.models.Sucurs.bulkCreate(sucur);
  return rta;
};

// newSucur([
//   // { sucur: "Agencia Centro Valencia", idSucursal: "13" },
//   { sucur: "Casa Central", idSucursal: "1" },
//   { sucur: "Sucursal Lechería", idSucursal: "10" },
//   { sucur: "Sucursal Puerto Ordaz", idSucursal: "11" },
//   { sucur: "Agencia San Diego", idSucursal: "12" },
//   { sucur: "Sucursal El Paraiso", idSucursal: "14" },
//   { sucur: "Sucursal Chacao", idSucursal: "15" },
//   { sucur: "Sucursal Maracaibo", idSucursal: "16" },
//   { sucur: "Agencia Puerto Cabello", idSucursal: "17" },
//   { sucur: "Sucursal La Trinidad", idSucursal: "18" },
//   { sucur: "Sucursal Candelaria", idSucursal: "19" },
//   { sucur: "Principal", idSucursal: "2" },
//   { sucur: "Agencia Online", idSucursal: "20" },
//   { sucur: "Sucursal Puerto Ordaz II", idSucursal: "21" },
//   { sucur: "Sucursal El Recreo", idSucursal: "22" },
//   { sucur: "Sucursal Acarigua-Araure", idSucursal: "23" },
//   { sucur: "Sucursal Valle La Pascua", idSucursal: "24" },
//   { sucur: "Sucursal Maturin", idSucursal: "25" },
//   { sucur: "Sucursal El Tigre", idSucursal: "26" },
//   { sucur: "Agencia Guacara", idSucursal: "27" },
//   { sucur: "Agencia Cdd", idSucursal: "28" },
//   { sucur: "Sucursal Porlamar", idSucursal: "29" },
//   { sucur: "Sucursal Punto Fijo", idSucursal: "3" },
//   { sucur: "Sucursal Barquisimeto Centro", idSucursal: "30" },
//   { sucur: "Sucursal Maracay Centro", idSucursal: "31" },
//   { sucur: "Sucursal San Felipe", idSucursal: "32" },
//   { sucur: "Sucursal San Cristobal", idSucursal: "33" },
//   { sucur: "Sucursal Valera", idSucursal: "34" },
//   { sucur: "Sucursal Puerto La Cruz Centro", idSucursal: "35" },
//   { sucur: "Sucursal Cabimas", idSucursal: "36" },
//   { sucur: "Agencia Valencia", idSucursal: "4" },
//   { sucur: "Sucursal Bello Monte", idSucursal: "5" },
//   { sucur: "Sucursal Boleita", idSucursal: "6" },
//   { sucur: "Sucursal Barquisimeto", idSucursal: "7" },
//   { sucur: "Sucursal Maracay", idSucursal: "8" },
//   { sucur: "Sucursal Carrizal", idSucursal: "9" },
//   { sucur: "CDD", idSucursal: "99" },
//   { sucur: "SMARTECH", idSucursal: "98" },
//   { sucur: "Sucursal La Guaira", idSucursal: "37" },
//   { sucur: "IMPORTACIONES", idSucursal: "97" },
//   { sucur: "Sucursal La Limpia", idSucursal: "38" },
//   { sucur: "Sucursal 5 de Julio", idSucursal: "39" },
//   { sucur: "Sucursal San Martin", idSucursal: "40" },
// ]);

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

const store = (list) => {
  if (list === "3") {
    // AZUL
    return ["'EXH-AZ'", "'RC-RCBLE'"];
  } else if (list === "11") {
    // ESPECIAL
    return ["'ALM'", "'EXH', 'OB'"];
  } else if (list === "2") {
    // ESTANDAR
    return ["'ALM'", "'EXH', 'OB'"];
  } else if (list === "8") {
    // GRADO A
    return ["'ALM-GD-A'", "'GD-A'"];
  } else if (list === "9") {
    // GRADO B
    return ["'ALM-GD-B'", "'GD-B'"];
  } else if (list === "10") {
    // GRADO C
    return ["'ALM-GD-C'", "'GD-C'"];
  } else if (list === "7") {
    // MAGENTA
    return ["'RC-RCMGT'"];
  } else if (list === "1") {
    // MARGARITA
    return ["'ALM'", "'EXH', 'OB'"];
  } else if (list === "4") {
    // NARANJA
    return ["'EXH-NJ'", "'RC-RCORG'"];
  } else if (list === "6") {
    // VERDE
    return ["'EXH-VD'", "'RC-RCGRN'"];
  } else {
    return null;
  }
};

const products = async (list, type, sucur) => {
  // OBTENER ALMACEN SEGUN LA LISTA
  let rtaStore = store(list);
  var rta = "";

  if (type == "0") {
    // HABLADOR PEQUEÑO
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
        ,[Nombre]
        ,[Marca]
        ,[Garantia]
        ,[CodigoBarra]
        ,[PrecioaMostrar]
        ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE (Codigo not like 'LB%' AND Codigo not like 'LM%') AND CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}
    AND [IdAlmacen] IN (${rtaStore})
 `);
  } else if (type == "1") {
    // HABLADOR GRANDE
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
        ,[Nombre]
        ,[Marca]
        ,[Garantia]
        ,[CodigoBarra]
        ,[PrecioaMostrar]
        ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE (Codigo like 'LB%' OR Codigo like 'LM%') AND CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}
    AND [IdAlmacen] IN (${rtaStore}) 
 `);
  } else {
    // HABLADOR ESTANDAR
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
        ,[Nombre]
        ,[Marca]
        ,[Garantia]
        ,[CodigoBarra]
        ,[PrecioaMostrar]
        ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}
    AND [IdAlmacen] IN (${rtaStore})
 `);
  }
  // console.log("sss",rta);
  return rta;
};

const productsSupermarket = async (list, size, type, sucur) => {
  // OBTENER ALMACEN SEGUN LA LISTA
  let rtaStore = store(list);

  // HABLADOR ESTANDAR
  const response = await sequelize.query(`
    SELECT DISTINCT *
    FROM  [dbo].[HabladoresTiendas_supermercado]
    WHERE CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}
    AND [IdAlmacen] IN (${rtaStore})
 `);

  return response;
};

const processData = async (data, list, sucur, sizeTalker) => {
  // OBTENER ALMACEN SEGUN LA LISTA
  let rtaStore = store(list);
  var rta = "";
  var sku = data.sapCode[0].flat();
  sku = sku.filter((element) => element !== null);

  // ESTO BUSCA EL PATRON DE LOS CODIGOS SAP PARA LIMPIAR LA DATA
  const regex = /^([A-Z]{2})-(\d{8})$/;
  sku = sku.filter((element) => regex.test(element));

  const modSku = sku.map((elemento) => {
    return `'${elemento}'`;
  });

  if (sizeTalker == "0") {
    // HALADOR PEQUEÑO
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
    ,[Nombre]
    ,[Marca]
    ,[Garantia]
    ,[CodigoBarra]
    ,[PrecioaMostrar]
    ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE (Codigo not like 'LB%' AND Codigo not like 'LM%') AND CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo IN (${modSku})
    AND [IdAlmacen] IN (${rtaStore})
    `);
  } else if (sizeTalker == "1") {
    // HABLADOR GRANDE
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
    ,[Nombre]
    ,[Marca]
    ,[Garantia]
    ,[CodigoBarra]
    ,[PrecioaMostrar]
    ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE (Codigo like 'LB%' OR Codigo like 'LM%') AND CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo IN (${modSku})
    AND [IdAlmacen] IN (${rtaStore})`);
  } else if (sizeTalker == "2") {
    // HABLADOR ESTANDAR
    rta = await sequelize.query(`
    SELECT DISTINCT [Codigo]
    ,[Nombre]
    ,[Marca]
    ,[Garantia]
    ,[CodigoBarra]
    ,[PrecioaMostrar]
    ,[IdHablador]
         ,[CodigoServicio]
      ,[PrecioServicio]
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo IN (${modSku})
    AND [IdAlmacen] IN (${rtaStore})`);
  } else {
    return rta;
  }

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

  data.map((item) => {
    priceTalkerData.push({
      priceTalkerBrand: item.Marca,
      priceTalkerdescription: item.Nombre,
      priceTalkerPrice: item.PrecioaMostrar,
      priceTalkerSapCode: item.Codigo,
      priceTalkerBarCode: item.CodigoBarra,
      priceTalkerWarranty: item.Garantia,
      priceTalkerIdHablador: item.IdHablador,
      priceTalkerService: item.CodigoServicio,
      priceTalkerServicePrice: item.PrecioServicio,
    });
  });

  // console.log(priceTalkerData);

  return priceTalkerData;
};

const priceList = async () => {
  const rta = await sequelize.models.List.findAll({
    order: [["title", "ASC"]],
  });
  return rta;
};

const ajustarCadena = (cadena) => {
  let palabras = cadena.split(" ");

  while (cadena.length > 75) {
    // Quita la última palabra
    palabras.pop();
    // Reconstruye la cadena
    cadena = palabras.join(" ");
  }

  return cadena;
};

const fakeapi = async () => {
  const response = await axios.get("https://fakestoreapi.com/products/1");
  // const { data } = response;
  // data.dev = "alice_dev";
  return response; // data
};

fakeapi();

// let list =
// {
//   title: "Lista Margarita",
//   value: 1
// }
// newList(list)

comboDaka();

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
  ajustarCadena,
  productsSupermarket,
  fakeapi,
};
