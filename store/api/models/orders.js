const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
  },
  orderId: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  items: [
    {
      sku: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: "In progress",
  },
});

orderSchema.plugin(AutoIncrement, {
  inc_field: "orderId",
  id: "orderNums",
  start_seq: 100,
});

module.exports = mongoose.model("Order", orderSchema);
