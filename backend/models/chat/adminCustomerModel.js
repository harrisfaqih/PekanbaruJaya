const { Schema, model } = require("mongoose");

const adminCustomerSchema = new Schema(
  {
    myId: {
      type: String,
      required: true,
    },
    myFriends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("admin_customers", adminCustomerSchema);
