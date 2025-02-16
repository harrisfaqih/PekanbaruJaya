const dashboardController = require("../../controllers/dashboard/dashboardController");
const { authMiddlewares } = require("../../middlewares/authMiddlewares");
const router = require("express").Router();

router.get(
  "/admin/get-dashboard-data",
  authMiddlewares,
  dashboardController.get_admin_dashboard_data
);

router.get(
  "/admin/get-products-with-low-stock",
  //authMiddlewares,
  dashboardController.get_products_with_low_stock
);

module.exports = router;
