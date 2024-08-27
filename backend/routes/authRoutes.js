const authControllers = require("../controllers/authControllers");
const { authMiddlewares } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddlewares, authControllers.getUser);
// router.post("/seller-register", authControllers.seller_register);
// router.post("/seller-login", authControllers.seller_login);
router.get("/logout", authMiddlewares, authControllers.logout);

module.exports = router;
