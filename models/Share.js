module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define(
    "share",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      symbol: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Z]{3}$/, // 3 capital letters
        },
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
    },
    {
      tableName: "shares",
      timestamps: true,
    }
  );

  return Share;
};
