const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const verifyJWT = require("../middleware/verifyJWT")

router
  .route("/")
  .get(orderController.getAllOrders) //get all orders
  .post(orderController.createNewOrder) //create new order
  .patch(orderController.updateOrder) //update order
  .delete(orderController.deleteOrder); //delete order

router.use(verifyJWT)

router.route("/:user").get(orderController.getAllOrdersByUser); //get all orders for auth user

module.exports = router;
