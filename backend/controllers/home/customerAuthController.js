const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utiles/response");
const bcrypt = require("bcrypt");
const adminCustomerModel = require("../../models/chat/adminCustomerModel");
const { createToken } = require("../../utiles/tokenCreate");

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email Already Exits" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        await adminCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "User Register Success", token });
      }
    } catch (error) {}
  };
}

module.exports = new customerAuthController();
