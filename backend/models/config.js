const { Sequelize, DataTypes, Model } = require("sequelize");

// configure database
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     logging: false,
//     dialect: "mysql",
//     // port:3306,
//   },
// );


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false, // Disable logging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// check db connection
try {
  sequelize.authenticate();
  console.log("DB Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes, Model);
db.categories = require("./categoryModel")(sequelize, DataTypes, Model);
db.products = require("./ItemsModel")(sequelize, DataTypes, Model);

// db.products = require('./productModel')(sequelize, DataTypes, Model)

// const User = require('./userModel')(sequelize, DataTypes, Model);
// // const Products = require('./productModel')(sequelize, DataTypes, Model);
// const Category = require('./categoryModel')(sequelize, DataTypes, Model);
// const Item = require('./ItemsModel')(sequelize, DataTypes, Model);

// Define associations
// User.hasMany(db.products);
// Product.belongsTo(Product);

// db.users.hasOne(db.products, { foreignKey: 'userId' , as : 'user', allowNull: false })
// db.products.belongsTo(db.users)

// db.categories.hasOne(db.products, { foreignKey: 'categoryId', allowNull: false })
// db.products.belongsTo(db.categories)

db.sequelize.sync({ force: false });
module.exports = db;
