const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const router = Router();
const {
  findAll,
  newUser,
  updateUser,
  deleteUser,
  products,
  processData,
  stateData,
  modelData,
  findByEmail,
  priceList
} = require("../controllers/main");

// const { proccessData } = require('../controllers/debug.controller');
const {
  bigPriceTalker,
} = require("../controllers/priceTalkerPdfGrande.controller");

const {
  bigNewPriceTalker,
} = require("../controllers/priceTalkerPdfNewGrande.controller");

const {
  smallPriceTalker,
} = require("../controllers/priceTalkerPdfPequeno.controller");

const { createFolder } = require("../controllers/createFolder.controller");

const { calculateIva } = require("../controllers/calculate.controller");

const { uploadImage, upload } = require("../controllers/changeLogo.controller");

const { changeLogo } = require("../controllers/remplaceRoute.controller");

const { buildPdf } = require("../controllers/pdfkit.down.controller");

const { priceTalkerTest } = require("../controllers/habladores.pruebas");

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

// EN PROCESO DE VALIDACIÓN
router.get(`/gene-supermarket/:list/size/sucur`, async (req, res) => {
  const { list, type, sucur } = req.params;
  const rta = await products(list, type, sucur);
  res.json(rta[0]); 
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

// router.post("/generate-pdf", async (req, res) => {
//   console.log(req.body);
//   res.json({ oye: "todo bien"})
// });

// router.get("/download", (req, res) => {
//   const stream = res.writeHead(200, {
//     "Content-Type": "application/pdf",
//     "Content-Disposition": "attachment; filename=alicePdf.pdf",
//   });

//   buildPdf(
//     (data) => stream.write(data),
//     () => stream.end()
//   );
// });

// router.get("/download", (req, res) => {
//   let noData = data;
//   // console.log(noData);

//   // const stream = res.writeHead(200, {
//   //   "Content-Type": "application/pdf",
//   //   "Content-Disposition": "attachment; filename=alicePdf.pdf",
//   // });

//   // buildPdf(
//   //   (data) => stream.write(data),
//   //   () => stream.end(),
//   //   noData
//   // );
// });

router.post("/generate-pdf", async (req, res) => {
  // console.log(req.body);
  const { data, list, sizeTalker } = req.body;

  // console.log(req.body);

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
      // HABLADOR PEQUEÑO
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
      // HABLADOR PEQUEÑO

      const proData = modelData(data);
      proData.forEach((obj) => {
        obj.priceTalkerList = list;
      });

      const noData = proData;
      // console.log(noData);

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

router.post("/send/sap-code/:list/:sucur/:sizeTalker", async (req, res) => {
  const { list, sucur, sizeTalker } = req.params;
  const { sapCode } = req.body;
  // console.log(sapCode[0].length);

  if (sapCode[0].length > 5000) {
    res.json({
      status: "error",
      descrip:
        "El sistema no admite más de 5000 códigos SKU. Por favor, ingrese una cantidad inferior.",
    });
  } else {
    const rta = await processData(req.body, list, sucur, sizeTalker);
    // console.log("rta",rta[0]);
    res.json({ status: "ok", data: rta[0] });
  }
});

router.post("/send/sap-code1", async (req, res) => {
  const rta = await stateData();
  //let rtaJson = JSON.stringify(rta)
  res.json(rta); // rtaJson
});

router.post("/change/logo", async (req, res) => {
  // const filePath = path.join(__dirname, "/uploads/", req.file.originalname);
  // console.log(filePath);
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
  // console.log(name);
  await updateUser(req.params["id"], name);
  res.json({ update_records: name });
});

// DELETE
router.delete("/deleteUser/:id", async (req, res) => {
  const rta = await deleteUser(req.params["id"]);
  res.json({ deleted_records: rta });
});

module.exports = router;
