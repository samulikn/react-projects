const Order = require("../models/orders");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const { format } = require("date-fns");

// desc: get all orders from MongoDB
// route: GET

// To do: get all orders by user
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().lean();
  if (!orders.length) {
    return res.status(400).json({ message: "No data found! " });
  }
  res.json(orders);
});

// desc: Create new order
// route: POST

// To do:
const createNewOrder = asyncHandler(async (req, res) => {
  const { email, total, items, status } = req.body;
  const orderDate = format(new Date(), "yyyyMMdd\tHH:mm:ss");

  if (!email || !items) {
    return res.status(400).json({ message: "email and items are required!" });
  }

  const newOrder = { email, orderDate, total, items, status };

  const order = await Order.create(newOrder);

  if (order) {
    res.status(201).json(order.orderId);
  } else {
    res.status(400).json({ message: "Invalid order data!" });
  }
});

// desc: Update order
// route: PATCH

// To do: add status to model and use it
const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required!" });
  }

  const order = await Order.findById({ _id: id }).exec();

  if (!order) {
    return res
      .status(400)
      .json({ message: `Order ${order.orderId} not found!` });
  }

  if (order.status === "Completed") {
    return res
      .status(400)
      .json({ message: `Order ${order.orderId} already completed!` });
  }

  order.status = "Completed";

  const updatedOrder = await order.save();

  res.status(201).json({ message: `Order ${updatedOrder.orderId} updated!` });
});

// desc: Delete order
// route: DELETE

// To do: add status to model and use it
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required!" });
  }

  const order = await Order.findById({ _id: id }).exec();

  if (!order) {
    return res
      .status(400)
      .json({ message: `Order ${order.orderId} not found!` });
  }

  if (order.status === "In progress") {
    return res.status(400).json({
      message: `Order ${order.orderId} could not delete! It's in progress`,
    });
  }

  const deletedOrder = await order.deleteOne();
  res.json({ message: `Order ${order.orderId} deleted!` });
});

// desc: Get all orders by user
// route: GET
const getAllOrdersByUser = asyncHandler(async (req, res) => {
  const { user } = req.params;

  if (!user) {
    return res.status(400).json({ message: "user is required!" });
  }

  const registeredUser = await User.findByEmail(user);

  if (!registeredUser) {
    return res
      .status(400)
      .json({ message: `Username ${user} is not registered.` });
  }

  const orders = await Order.find({ email: registeredUser.email }).lean().exec();
  if (!orders.length) {
    return res.status(406).json({ message: "No data found! " });
  }
  res.json(orders);
});

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersByUser,
};
