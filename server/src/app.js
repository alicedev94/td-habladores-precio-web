const express = require("express");
const router = require("./routes/main");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = 3001;

// Aumenta el límite de tamaño del body a 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`run on port ${port}`);
});
