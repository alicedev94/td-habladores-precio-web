const { Router } = require("express");

const router = Router();
const {
  findAll,
  newUser,
  updateUser,
  deleteUser,
  products,
  processData,
  processDataCdd,
  stateData,
  modelData,
  findByEmail,
  priceList,
  productsSupermarket,
} = require("../controllers/main");

const {
  bigNewPriceTalker,
} = require("../controllers/priceTalkerPdfNewGrande.controller");

const {
  smallPriceTalker,
} = require("../controllers/priceTalkerPdfPequeno.controller");

const { uploadImage, upload } = require("../controllers/changeLogo.controller");

const { changeLogo } = require("../controllers/remplaceRoute.controller");

const {
  habladorUltimasExistenciasG,
} = require("../controllers/habladorUltimasExistenciasG");

const { armaCombo } = require("../controllers/main.super.market");

const {
  habladorUltimasM,
} = require("../controllers/ultimasExistenciasMediano");

// RUTRAS PARA EL NUEVO LAYOUT
// RUTAS PARA EL CDD ACA LOS DATOS Y EL PDF DEL HABLADOR PARA CDD
const { dataCdd, geneCdd } = require("../controllers/cdd.controller");

// RUTA PARA LA GENERACION DE PROMO
const { habladorPromoG } = require("../controllers/habladorPromoDakaG");
const { PromoDakaM } = require("../controllers/habladorPromoDakaM");
const { PromoDakaP } = require("../controllers/habladorPromoDakaP");

// GET
router.get("/", async (req, res) => {
  const rta = await findAll();
  res.json(rta);
});

router.get("/products/:list/:type/:sucur", async (req, res) => {
  const { list, type, sucur } = req.params;
  const rta = await products(list, type, sucur); // stateData products
  res.json(rta[0]); // rta[0]
});

router.get("/priceList", async (req, res) => {
  const rta = await priceList();
  res.json(rta);
});

// POST
router.post("/newUser", async (req, res) => {
  await newUser(req.body);
  res.json(req.body);
});

router.post("/signin", async (req, res) => {
  // manejar las respuestas del servidor
  const { email, password } = req.body;

  // PRIMER NIVEL DE VALIDACION
  const user = await findByEmail(email);
  if (user != null) {
    // SEGUNDO NIVEL DE VALIDACION
    if (user.dataValues.password === password) {
      res.json({
        auth: true,
        rtaEmail: user.dataValues.email,
        rtaRol: user.dataValues.rol,
        idSucursal: user.dataValues.idSucursal,
      });
    } else {
      res.json({
        auth: false,
        note: "Contraseña incorrecta.",
      });
    }
  } else {
    res.json({
      auth: false,
      note: "No se pudo encontrar un usuario con el correo electrónico proporcionado. Verifique la dirección e intente nuevamente.",
    });
  }
});

router.post("/generate-pdf", async (req, res) => {
  const { data, list, sizeTalker } = req.body;

  try {
    if (sizeTalker === "0") {
      // HABLADOR PEQUEÑO
      const proData = modelData(data);
      proData.forEach((obj) => {
        obj.priceTalkerList = list;
      });

      const noData = proData;
      // console.log("PRECIOS GRANDES",noData);

      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=alicePdf.pdf",
      });

      await smallPriceTalker(
        (data) => stream.write(data),
        () => stream.end(),
        noData
      );
    } else if (sizeTalker === "1") {
      // HABLADOR GRANDE
      const proData = modelData(data);
      proData.forEach((obj) => {
        obj.priceTalkerList = list;
      });

      const noData = proData;

      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=alicePdf.pdf",
      });

      await bigNewPriceTalker(
        // bigPriceTalker
        (data) => stream.write(data),
        () => stream.end(),
        noData
      );
    } else if (sizeTalker === "2") {
      // HABLADOR GRANDE
      const proData = modelData(data);
      proData.forEach((obj) => {
        obj.priceTalkerList = list;
      });

      const noData = proData;

      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=alicePdf.pdf",
      });

      // FUNCIONAL
      // await bigPriceTalker(
      //   (data) => stream.write(data),
      //   () => stream.end(),
      //   noData
      // );
      await bigNewPriceTalker(
        (data) => stream.write(data),
        () => stream.end(),
        noData
      );
    } else {
      console.error("DATO NO CONTEMPLADO");
    }
  } catch (error) {}
});

router.post("/generate-super-pdf", async (req, res) => {
  // SUPER MERCADO
  const { data, list, sizeTalker, typeTalker, datosRelacionados } = req.body;
 
  try {
    if (typeTalker === "0") {
      // PROMO DAKA (COMBOS)
      // TAMAÑO DEL HABLADOR
      if (sizeTalker === "0") {
        // PROMO MEDIANO
        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=alicePdf.pdf",
        });

        await PromoDakaP(
          (data) => stream.write(data),
          () => stream.end(),
          data, list
        );
      } else if (sizeTalker === "1") {
        // PROMO MEDIANO
        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=alicePdf.pdf",
        });

        await PromoDakaM(
          (data) => stream.write(data),
          () => stream.end(),
          data, list
        );
      } else {
        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=alicePdf.pdf",
        });

        await habladorPromoG(
          (data) => stream.write(data),
          () => stream.end(),
          data,
          list,
          datosRelacionados
        );
      }
      // --
    } else if (typeTalker === "1") {
      // ULTIMAS EXISTENCIAS
      if (sizeTalker === "0") {
        // HABLADOR PEQUEÑO
        console.log("EN DESARROLLO: ULTIMAS EXISTENCIAS, PEQUEÑO");
      } else if (sizeTalker === "1") {
        // HABLADOR MEDIANO
        const proData = modelData(data);
        proData.forEach((obj) => {
          obj.priceTalkerList = list;
        });

        const noData = proData;

        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=alicePdf.pdf",
        });

        await habladorUltimasM(
          (data) => stream.write(data),
          () => stream.end(),
          noData
        );
      } else if (sizeTalker === "2") {
        // HABLADOR GRANDE
        const proData = modelData(data);
        proData.forEach((obj) => {
          obj.priceTalkerList = list;
        });

        const noData = proData;

        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=alicePdf.pdf",
        });

        const response = await habladorUltimasExistenciasG(
          (data) => stream.write(data),
          () => stream.end(),
          noData
        );

        // res.json({ estado: response}); 
      } else {
        console.error("DATO NO CONTEMPLADO");
      }
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return error;
  }
});

// EN PROCESO DE VALIDACIÓN
router.get(`/gene-supermarket/:list/:size/:type/:sucur`, async (req, res) => {
  // LO QUE ESTAB AANTES DE COMENZAR A TRABAJAR
  const { list, size, type, sucur } = req.params;
  const rta = await productsSupermarket(list, size, type, sucur);
  res.json(rta[0]);
});

// EN PROCESO DE VALIDACION 2
router.post(`/gene-cdd/:rack/:galpon`, async (req, res) => {
  const { data, list, sizeTalker } = req.body;
  const { rack, galpon } = req.params;

  const proData = modelData(data);
  proData.forEach((obj) => {
    obj.priceTalkerList = list;
  });

  const noData = proData;

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=alicePdf.pdf",
  });

  await geneCdd(
    // hasta este punto es totalmente funcional [smallPriceTalker]
    (data) => stream.write(data),
    () => stream.end(),
    noData,
    rack,
    galpon,
    sizeTalker
  );
  // GENERAR EL HABLADOR DEL CDD
});

router.post(`/arma-combo`, async (req, res) => {
  // LO QUE ESTAB AANTES DE COMENZAR A TRABAJAR
  const { codigo_relaclion } = req.body;
  const rta = await armaCombo(codigo_relaclion);
  res.json(rta[0]);
});

router.post("/send/sap-code/:list/:sucur/:sizeTalker", async (req, res) => {
  const { list, sucur, sizeTalker } = req.params;
  const { sapCode } = req.body;

  if (sapCode[0].length > 5000) {
    res.json({
      status: "error",
      descrip:
        "El sistema no admite más de 5000 códigos SKU. Por favor, ingrese una cantidad inferior.",
    });
  } else {
    const rta = await processData(req.body, list, sucur, sizeTalker);
    res.json({ status: "ok", data: rta[0] });
  }
});

router.post("/send/sap-code-cdd", async (req, res) => {
  const { sapCode } = req.body;

  if (sapCode[0].length > 5000) {
    res.json({
      status: "error",
      descrip:
        "El sistema no admite más de 5000 códigos SKU. Por favor, ingrese una cantidad inferior.",
    });
  } else {
    const rta = await processDataCdd(req.body);
    res.json({ status: "ok", data: rta});
  }
});

router.post("/send/sap-code1", async (req, res) => {
  const rta = await stateData();
  //let rtaJson = JSON.stringify(rta)
  res.json(rta); // rtaJson
});

router.post("/change/logo", async (req, res) => {
  try {
    uploadImage(req, res, (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.json(err);
      } else {
        const { originalname } = req.file;
        const rta = changeLogo(originalname);
        res.json(req.file);
      }
      // const { originalname } = req.file;
      //const rta = changeLogo(originalname);
    });
  } catch (error) {
    console.error(error);
  }
});

// PUT
router.put("/updateUser/:id", async (req, res) => {
  const name = req.body.name;
  await updateUser(req.params["id"], name);
  res.json({ update_records: name });
});

// DELETE
router.delete("/deleteUser/:id", async (req, res) => {
  const rta = await deleteUser(req.params["id"]);
  res.json({ deleted_records: rta });
});

// fakeapi debug
router.get("/fakeapi", async (req, res) => {
  // const fakeapi = await fakeapi();
  res.json({ data: "alicedev94 in ubuntu" });
});

// nuevas rutas
router.get("/tabla-data-cdd", async (req, res) => {
  const response = await dataCdd();
  res.json(response[0]);
});

module.exports = router;
