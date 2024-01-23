const express = require("express");
const router = require("./routes/main");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = 3001;

// Aumenta el límite de tamaño del body a 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

// Configuración de Multer
// const upload = multer({
//   // Solo permitir archivos de imagen
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Solo se permiten imágenes"), false);
//     }
//   },
// });

// // Ruta para subir imágenes
// app.post("/upload", upload.single("image"), (req, res) => {
//   // Obtener la imagen subida
//   const image = req.file;

//   // Guardar la imagen en la carpeta /uploads
//   image.mv("./uploads/" + image.filename, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: err.message,
//       });
//     } else {
//       res.status(200).send({
//         message: "Imagen subida con éxito",
//       });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`run on port ${port}`);
});
