const { User, Share, Portfolio, Transaction } = require("../models/index");
const TransactionType = require("../dto/TransactionType");

exports.buyShare = async (userId, shareSymbol, quantity) => {
  // check share exist or not
  const share = await Share.findOne({ where: { symbol: shareSymbol } });
  if (!share) throw new Error("Share not found.");

  // check porfolio exist or not
  const portfolio = await Portfolio.findOne({ where: { userId: userId } });
  if (!portfolio) throw new Error("Portfolio not found.");

  // check balance is enought or not on porfolio
  let totalPrice = share.price * quantity;
  if (totalPrice > portfolio.balance)
    throw new Error("Porfolio balance is insufficient.");

  updatePortfolio(portfolio.id, -1 * totalPrice);
  updateShare(shareSymbol, quantity);
  const transaction = createTransaction(
    portfolio.id,
    shareSymbol,
    TransactionType.Buy,
    share.price,
    quantity
  );

  return transaction;
};

exports.sellShare = async (userId, shareSymbol, quantity) => {
  // check share exist or not
  const share = await Share.findOne({ where: { symbol: shareSymbol } });
  if (!share) throw new Error("Share not found.");

  // check porfolio exist or not
  const portfolio = await Portfolio.findOne({ where: { userId: userId } });
  if (!portfolio) throw new Error("Portfolio not found.");

  // check quantity is enought or not on share
  const transactions = await Transaction.findAll({
    where: { portfolioId: portfolio.id, shareSymbol: share.symbol },
  });

  let totalBought = 0;
  let totalSold = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === TransactionType.Buy) {
      totalBought += transaction.quantity;
    } else {
      totalSold += transaction.quantity;
    }
  });

  if (totalBought - totalSold < quantity)
    throw new Error("Not enough share to sell.");

  let totalPrice = share.price * quantity;

  updatePortfolio(portfolio.id, totalPrice);
  updateShare(shareSymbol, -1 * quantity);
  const transaction = createTransaction(
    portfolio.id,
    shareSymbol,
    TransactionType.Sell,
    share.price,
    quantity
  );

  return transaction;
};

async function updatePortfolio(portfolioId, totalPrice) {
  const portfolio = await Portfolio.findByPk(portfolioId);

  // update balance on porfolio
  portfolio.balance = parseFloat(portfolio.balance) + totalPrice;
  await portfolio.save();
}

async function updateShare(shareSymbol, quantity) {
  const share = await Share.findOne({ where: { symbol: shareSymbol } });

  // update quantity on share
  share.quantity = share.quantity + quantity;
  await share.save();
}

async function createTransaction(
  portfolioId,
  shareSymbol,
  TransactionType,
  price,
  quantity
) {
  // create transaction
  const transaction = await Transaction.create({
    type: TransactionType,
    price: price,
    quantity: quantity,
    shareSymbol: shareSymbol,
    portfolioId: portfolioId,
  });

  return transaction;
}
