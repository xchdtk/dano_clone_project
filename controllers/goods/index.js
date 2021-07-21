const { Router } = require("express");
const router = Router();
const ctrl = require("../goods/goods.ctrl");
const middleware = require("../../middleware/auth_middleware");

// 메인페이지(GET)
router.get("/mains", ctrl.get_main);

// 상세페이지(GET)
router.get("/details", ctrl.get_detail);

// 장바구니(GET)
router.get("/carts", middleware, ctrl.get_carts);

// 장바구니(POST)
router.post("/carts", middleware, ctrl.post_carts);

module.exports = router;
