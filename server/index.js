const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 400 },
  { id: 3, name: "Headphones", price: 120 },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});