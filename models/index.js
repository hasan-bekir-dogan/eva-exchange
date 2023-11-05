const Sequelize = require("sequelize");
const sequelizeConfig = require("../config/config.json");
const sequelize = new Sequelize(sequelizeConfig.development);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Share = require("./Share")(sequelize, Sequelize);
db.Portfolio = require("./Portfolio")(sequelize, Sequelize);
db.Transaction = require("./Transaction")(sequelize, Sequelize);

// Associations
db.User.hasOne(db.Portfolio, { foreignKey: "userId" });

db.Share.hasMany(db.Transaction, { foreignKey: "shareSymbol" });

db.Portfolio.belongsTo(db.User, { foreignKey: "userId" });
db.Portfolio.hasMany(db.Transaction, { foreignKey: "portfolioId" });

db.Transaction.belongsTo(db.Portfolio, { foreignKey: "portfolioId" });
db.Transaction.belongsTo(db.Share, { foreignKey: "shareSymbol" });

module.exports = db;
