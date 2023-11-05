const tradeService = require("../services/tradeService");

exports.buyShare = async (req, res) => {
  try {
    const result = await tradeService.buyShare(
      req.body.userId,
      req.body.shareSymbol,
      req.body.quantity
    );

    res.send(result);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.sellShare = async (req, res) => {
  try {
    const result = await tradeService.sellShare(
      req.body.userId,
      req.body.shareSymbol,
      req.body.quantity
    );

    res.send(result);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};
