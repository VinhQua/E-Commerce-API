const { sequelize } = require("../db/connectDB");
const { DataTypes } = require("sequelize");
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "products", modelName: "Product" }
);

const syncTable = async () => {
  await Product.sync({ alter: true });
};
// syncTable();
module.exports = Product;
