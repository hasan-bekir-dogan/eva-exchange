const express = require("express");
const tradeController = require("../controllers/tradeController");

const router = express.Router();

router.post("/buy", tradeController.buyShare);
router.post("/sell", tradeController.sellShare);

module.exports = router;
