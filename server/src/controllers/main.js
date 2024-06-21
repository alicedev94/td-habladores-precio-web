const { sequelize } = require("../lib/sequelize");

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


// newUser ({email: "limpia@tiendasdaka.com", password: "Daka38", rol: "ADMIN", idSucursal: "38"})

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
      ,PrecioTachado
      ,1 Codigo_relacion
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
      ,PrecioTachado
      ,1 Codigo_relacion
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
      ,PrecioTachado
      ,1 Codigo_relacion
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}
    AND [IdAlmacen] IN (${rtaStore})
 `);
  }

  return rta;
};

const productsSupermarket = async (list, size, type, sucur) => {
  // OBTENER ALMACEN SEGUN LA LISTA
  let rtaStore = store(list);

  // HABLADOR ESTANDAR
  const response = await sequelize.query(`
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
     ,[OldPrice]
     FROM [HABLADOR_PRECIO_DEV].[dbo].[HabladoresCombos]
 `);
  return response;
};

const processData = async (data, list, sucur, sizeTalker) => {
  // OBTENER ALMACEN SEGUN LA LISTA
  let rtaStore = store(list);
  var rta = "";
  let sku = data.sapCode[0].flat();
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
      ,PrecioTachado
      ,1 Codigo_relacion
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
      ,PrecioTachado
      ,1 Codigo_relacion
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
      ,PrecioTachado
      ,1 Codigo_relacion
    FROM  [HABLADOR_PRECIO_DEV].[dbo].[HabladoresTiendas]
    WHERE CodigoSucursal = ${sucur} AND [Lista Precio] = ${list}  AND Codigo IN (${modSku})
    AND [IdAlmacen] IN (${rtaStore})`);
  } else {
    return rta;
  }

  return rta;
};

const datosCdd = async (data) => {
  let sku = data.sapCode[0].flat();
  sku = sku.filter((element) => element !== null);

  // ESTO BUSCA EL PATRON DE LOS CODIGOS SAP PARA LIMPIAR LA DATA
  const regex = /^([A-Z]{2})-(\d{8})$/;
  sku = sku.filter((element) => regex.test(element));

  const modSku = sku.map((elemento) => {
    return `'${elemento}'`;
  });

  const respuesta = await sequelize.query
  (`
    SELECT TOP (1000) [ItemCode]
      ,[descripcion]
      ,[cod_marca]
      ,[marca]
      ,[codgrupo]
      ,[grupo]
    FROM
   [HABLADOR_PRECIO_DEV].[dbo].[catalogo_productos_cdd]
   WHERE [ItemCode] IN (${modSku})
   `
  );

  return respuesta;
};

const processDataCdd = async (data) => {
  const datos = data.sapCode;
  // Convertir los datos en un objeto de datos
  const data1 = datos[0].map(([codigo, cantidad, galpon]) => ({ codigo, cantidad, galpon }));

  const data2 = await datosCdd(data);

  // Fusionar los datos
  const resultado = data1.map((item1) => {
    const item2 = data2[0].find((item2) => item2.ItemCode === item1.codigo);
    try {
      
      return {
        // CAMPOS NECESARIOS PARA EL HABLADOR DEL CDD
        Codigo: item1.codigo,
        Nombre: item2.descripcion,
        Marca: item2.marca,
        Cantidad: item1.cantidad,
        grupo: item2.grupo,
        galpon: item1.galpon
      };
    } catch (error) {
      console.log(error);
    }
  });

  return resultado;
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
      precioTachado: item.PrecioTachado,
      linea: item.grupo,
      cantidad: item.Cantidad,
      galpon: item.galpon
    });
  });

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

module.exports = {
  findAll,
  newUser,
  deleteUser,
  updateUser,
  products,
  processData,
  processDataCdd,
  modelData,
  findByEmail,
  priceList,
  ajustarCadena,
  productsSupermarket,
};
