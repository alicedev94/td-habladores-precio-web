const { Router } = require("express");
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
} = require("../controllers/main");

// const { proccessData } = require('../controllers/debug.controller');
const {
  bigPriceTalker,
} = require("../controllers/priceTalkerPdfGrande.controller");

const {
  createFolder,
} = require("../controllers/createFolder.controller");


// GET
router.get("/", async (req, res) => {
  const rta = await findAll();
  res.json(rta);
});

router.get("/products/:list/:type", async (req, res) => {
  const { list, type } = req.params;
  const rta = await products(list, type); // stateData products
  res.json(rta[0]); // rta[0]
});

// POST
router.post("/newUser", async (req, res) => {
  await newUser(req.body);
  res.json(req.body);
});

router.post("/signin", async (req, res) => {
  // manejar las respuestas del servidor
  const { email, password } = req.body;
  if (email == "admin" && password == 123) {
    res.json({
      auth: true,
      rtaEmail: "alice@gmail.com",
      rtaRol: "admin", // customer
      idSucursal: "4",
      sucursal: "Valencia"
    });
  } else {
    res.json({
      auth: false,
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
      const data = req.body;
      const proData = await modelData(data);
      const rta = await bigPriceTalker(proData);
      res.json({ value: rta });
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/send/sap-code", async (req, res) => {
  const rta = await processData(req.body);
  // let rtaJson = JSON.stringify(rta)
  res.json(rta[0]);
});

router.post("/send/sap-code1", async (req, res) => {
  const rta = await stateData();
  //let rtaJson = JSON.stringify(rta)
  res.json(rta); // rtaJson
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
