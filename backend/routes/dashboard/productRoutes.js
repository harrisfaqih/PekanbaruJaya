const { Router } = require("express");
const productController = require("../../controllers/dashboard/productController");
const { authMiddlewares } = require("../../middlewares/authMiddlewares");
const router = require("express").Router();

router.post("/product-add", /*authMiddlewares,*/ productController.add_product);
router.get(
  "/products-get",
  /*authMiddlewares,*/ productController.products_get
);
router.get(
  "/product-get/:productId",
  /*authMiddlewares,*/ productController.product_get
);
router.post(
  "/product-update",
  /*authMiddlewares,*/ productController.product_update
);
router.post(
  "/product-image-update",
  /*authMiddlewares,*/ productController.product_image_update
);

module.exports = router;
