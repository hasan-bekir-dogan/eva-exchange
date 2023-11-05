"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create users data
    const users = await queryInterface.bulkInsert(
      "users",
      [
        { name: "Ahmet", email: "ahmet@hotmail.com", createdAt: new Date() },
        { name: "Fatma", email: "fatma@hotmail.com", createdAt: new Date() },
        { name: "Gizem", email: "gizem@hotmail.com", createdAt: new Date() },
        { name: "Gül", email: "gul@hotmail.com", createdAt: new Date() },
        { name: "Bekir", email: "bekir@hotmail.com", createdAt: new Date() },
      ],
      { returning: true } // to get ids that is created data
    );

    // create porfolios data
    const portfoliosData = users
      .map((user) => {
        return [
          {
            balance: 250,
            userId: user.id,
            createdAt: new Date(),
          },
        ];
      })
      .flat();

    const portfolios = await queryInterface.bulkInsert(
      "portfolios",
      portfoliosData,
      { returning: true } // to get ids that is created data
    );

    // create shares data
    const shares = await queryInterface.bulkInsert(
      "shares",
      [
        { symbol: "USD", quantity: 80, price: 28.41, createdAt: new Date() },
        { symbol: "GBP", quantity: 70, price: 35.13, createdAt: new Date() },
        { symbol: "EUR", quantity: 60, price: 30.49, createdAt: new Date() },
      ],
      { returning: true } // to get ids that is created data
    );

    // create transactions data
    const transactions = [];
    let tempShareSeq, tempShareBuyQuantity, tempShareSellQuantity;

    for (let i = 0; i < portfolios.length; i++) {
      tempShareSeq = Math.floor(Math.random() * shares.length);
      tempShareBuyQuantity = Math.floor(Math.random() * 10) + 1;
      tempShareSellQuantity = Math.floor(Math.random() * 10) + 1;

      transactions.push({
        portfolioId: portfolios[i].id,
        shareSymbol: shares[tempShareSeq].symbol,
        type: "BUY",
        quantity: tempShareBuyQuantity,
        price: shares[tempShareSeq].price,
        createdAt: new Date(),
      });
      transactions.push({
        portfolioId: portfolios[i].id,
        shareSymbol: shares[tempShareSeq].symbol,
        type: "SELL",
        quantity:
          tempShareBuyQuantity < tempShareSellQuantity
            ? tempShareBuyQuantity
            : tempShareSellQuantity,
        price: shares[tempShareSeq].price,
        createdAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("transactions", transactions);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactions", null, {});
    await queryInterface.bulkDelete("portfolios", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("shares", null, {});
  },
};
