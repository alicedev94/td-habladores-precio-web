const express = require("express");
const router = require("./routes/main");
const app = express();
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`run on port ${port}`);
});
