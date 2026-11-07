const express = require("express");
const productRoute = require("./routes/productRoute");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
