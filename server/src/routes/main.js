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
  priceList,
} = require("../controllers/main");

// const { proccessData } = require('../controllers/debug.controller');
const {
  bigPriceTalker,
} = require("../controllers/priceTalkerPdfGrande.controller");
const {
  smallPriceTalker,
} = require("../controllers/priceTalkerPdfPequeno.controller");

const { createFolder } = require("../controllers/createFolder.controller");

const { calculateIva } = require("../controllers/calculate.controller");

const { uploadImage, upload } = require("../controllers/changeLogo.controller");


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

// router.post("/generate-pdf", async (req, res) => {
//   console.log(req.body);
//   res.json({ oye: "todo bien"})
// });

router.post("/generate-pdf", async (req, res) => {
  try {
    const folder = createFolder("Habladores-Precio-Web");
    if (folder) {
      const { data, list, sizeTalker } = req.body;
      // console.log(req.body);
      if (sizeTalker === "0") {
        // HABLADOR PEQUEÑO
        const proData = await modelData(data);
        // Precios con iva aqui
        const proData1 = await calculateIva(proData);
        // --
        const rta = await smallPriceTalker(proData1);
        res.json({ value: rta });
      } else if (sizeTalker === "1") {
        // HABLADOR GRANDE
        const proData = await modelData(data);
        // Precios con iva aqui
        // --
        const rta = await bigPriceTalker(proData);
        res.json({ value: rta });
      } else {
        console.error("DATO NO CONTEMPLADO");
      }
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/send/sap-code/:list/:sucur", async (req, res) => {
  const { list, sucur } = req.params;
  const rta = await processData(req.body, list, sucur);
  // let rtaJson = JSON.stringify(rta)
  res.json(rta[0]);
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
        return res.send(err);
      }
      const { originalname } = req.file;
      //const rta = changeLogo(originalname);
    });
  } catch (error) {
    console.error(error);
  }
});

// PUT
router.put("/updateUser/:id", async (req, res) => {
  const name = req.body.name;
  console.log(name);
  await updateUser(req.params["id"], name);
  res.json({ update_records: name });
});

// DELETE
router.delete("/deleteUser/:id", async (req, res) => {
  const rta = await deleteUser(req.params["id"]);
  res.json({ deleted_records: rta });
});

module.exports = router;
