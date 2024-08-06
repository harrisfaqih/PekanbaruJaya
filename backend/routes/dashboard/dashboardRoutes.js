const dashboardController = require("../../controllers/dashboard/dashboardController");
const { authMiddlewares } = require("../../middlewares/authMiddlewares");
const router = require("express").Router();

router.get(
  "/admin/get-dashboard-data",
  authMiddlewares,
  dashboardController.get_admin_dashboard_data
);

module.exports = router;
