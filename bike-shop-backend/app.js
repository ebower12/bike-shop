const express = require("express");
const cors = require("cors");
const { getCart, updateCart } = require("./cartHandler");
const {
  getAvailableOptions,
  updateAvailableOptions,
} = require("./configurationHandler");
const { getBikes, updateBikes } = require("./bikeHandler");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/available-options", (_, res) => {
  try {
    const result = getAvailableOptions();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.put("/available-options", (req, res) => {
  try {
    const newOptions = req.body;
    const result = updateAvailableOptions(newOptions);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/cart", (_, res) => {
  try {
    const result = getCart();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.put("/cart", (req, res) => {
  try {
    const newCart = req.body;
    const result = updateCart(newCart);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bikes", (_, res) => {
  try {
    const result = getBikes();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.put("/bikes", (req, res) => {
  try {
    const newBikes = req.body;
    const result = updateBikes(newBikes);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
