const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const Contenedor = require("./Contenedor.js");
const contenedor = new Contenedor("productos.txt");

app.get("/api/productos", async (req, res) => {
  try {
    const products = contenedor.getAll();

    if (products) return res.status(200).send({ products: products });
    return res.status(200).send({ products: [] });
  } catch (error) {
    return res.status(500).send({ products: error });
  }
});

app.get("/api/productoRandom", async (req, res) => {
  try {
    const products = contenedor.getAll();
    const randomIndex = Math.floor(Math.random() * products.length) + 1;

    if (!randomIndex) {
      return res.status(200).send({ products: [] });
    }
    return res.status(200).send({ products: products[randomIndex - 1] });
  } catch (error) {
    return res.status(500).send({ products: error });
  }
});

const connectedServer = app.listen(PORT, async () => {
  contenedor.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  });
  contenedor.save({
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  });
  contenedor.save({
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  });
  console.log(`Server is up and running on port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
