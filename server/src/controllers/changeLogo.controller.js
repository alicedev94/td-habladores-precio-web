const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "/src/routes/uploads/"), // destination: path.join(__dirname, "/src/routes/uploads/"), // "C:/Users/d.marcano/Desktop/td-habladores-precio-web/server/src/routes/uploads/", // destination: path.join(__dirname, "/src/routes/uploads/")
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 100000000 },
}).single("image");

module.exports = { uploadImage, upload };
