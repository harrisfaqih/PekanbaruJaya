const { Router } = require("express");
const productController = require("../../controllers/dashboard/productController");
const { authMiddlewares } = require("../../middlewares/authMiddlewares");
const router = Router();

router.post("/product-add", authMiddlewares, productController.add_product);

module.exports = router;
