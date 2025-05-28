var express = require("express");
var router = express.Router();

const orders = require("../data/orders");

router.get("/", function (req, res, next) {
  return res.send(orders);
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  const order = orders.find((ord) => ord.id == orderId);
  if (!order) {
    const message = `order with ID ${orderId} was not found`;
    return res.status(404).json({ message });
  }
  return res.json(order);
});

router.post("/", (req, res, next) => {
  const order = req.body;
  order.id = orders.length + 1;
  orders.push(order);
  return res.status(201).json(order);
});

router.put("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  const index = orders.findIndex((ord) => ord.id == orderId);
  console.log({ orders, orderId, index });

  if (index > 0) {
    orders[index].items = req.body.items;
  } else {
    const message = `Order of Id ${orderId} does not exist`;
    return res.status(400).json({ message });
  }
  return res.status(201).json(orders[index]);
});

router.delete("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  const index = orders.findIndex((ord) => ord.id == orderId);
  if (index > 0) {
    orders[index].items = [];
  }
  return res.status(204).json({});
});

module.exports = router;
