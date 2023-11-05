"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      type: {
        type: Sequelize.ENUM("BUY", "SELL"),
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          len: [1, 10],
        },
      },

      createdAt: {
        type: Sequelize.DATE,
      },

      updatedAt: {
        type: Sequelize.DATE,
      },

      // Foreign key
      portfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
      },

      // Foreign key
      shareSymbol: {
        type: Sequelize.STRING(3),
        allowNull: false,
        references: {
          model: "shares",
          key: "symbol",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
