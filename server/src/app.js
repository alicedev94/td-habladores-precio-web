const express = require("express");
const router = require("./routes/main");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = 3001;
const path = require("path");

// Obtén la ruta del directorio actual
// let route = path.resolve();

// Aumenta el límite de tamaño del body a 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

// app.use((req, res, next) => {
//   app.locals.route = req.flash(route);
//   next();
// });

const server = app.listen(port, () => {
  console.log(`run on port ${port}`);
});
server.timeout = 30000; // 30 segundos
