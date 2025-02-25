const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router
  .route("/")
  .get(orderController.getAllOrders) //get all orders
  .post(orderController.createNewOrder) //create new order
  .patch(orderController.updateOrder) //update order
  .delete(orderController.deleteOrder); //delete order

router.route("/:user").get(orderController.getAllOrdersByUser); //get all user's orders

module.exports = router;
