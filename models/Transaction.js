module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      type: {
        type: DataTypes.ENUM("BUY", "SELL"),
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },

      createdAt: {
        type: DataTypes.DATE,
      },

      updatedAt: {
        type: DataTypes.DATE,
      },

      // Foreign key
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
      },

      // Foreign key
      shareSymbol: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "shares",
          key: "symbol",
        },
      },
    },
    {
      tableName: "transactions",
      timestamps: true,
    }
  );

  return Transaction;
};
