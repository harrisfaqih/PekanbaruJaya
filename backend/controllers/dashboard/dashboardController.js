const { responseReturn } = require("../../utiles/response");
const myShopWallet = require("../../models/myShopWallet");
const productModel = require("../../models/productModel");
const customerOrder = require("../../models/customerOrder");

//const adminSellerMessage = require("../../models/chat/adminSellerMessage");

class dashboardController {
  get_admin_dashboard_data = async (req, res) => {
    const { id } = req;
    //console.log(id);
    try {
      const totalSale = await customerOrder.aggregate([
        {
          $group: {
            _id: null,
            totalSale: { $sum: "$price" }, // Menghitung total price dari semua customerorder
          },
        },
      ]);
      const totalProduct = await productModel.find({}).countDocuments();
      const totalOrder = await customerOrder.find({}).countDocuments();
      //const totalSeller = await sellerModel.find({}).countDocuments();

      const totalStock = await productModel.aggregate([
        {
          $group: {
            _id: null,
            totalStock: { $sum: "$stock" },
          },
        },
      ]);

      const recentOrders = await customerOrder.find({}).limit(5);
      responseReturn(res, 200, {
        totalProduct,
        totalOrder,
        //totalSeller,
        recentOrders,
        totalSale: totalSale.length > 0 ? totalSale[0].totalSale : 0,
        totalStock: totalStock.length > 0 ? totalStock[0].totalStock : 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //end Method
}

module.exports = new dashboardController();
