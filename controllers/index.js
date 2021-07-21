const { Router } = require("express");
const router = Router();

router.use("/goods", require("./goods"));
router.use("/user", require("./user"));

module.exports = router;
