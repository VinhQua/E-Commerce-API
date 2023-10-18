const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");
const { User } = require("./user");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a name",
        },
        notEmpty: {
          msg: "Please enter a name",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: "Please enter a price",
        },
        notEmpty: {
          msg: "Please enter a price",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a description",
        },
        notEmpty: {
          msg: "Please enter a description",
        },
        len: {
          args: [2, 1000],
          msg: "Description cannot be more than 1000 characters",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please upload an image",
        },
        notEmpty: {
          msg: "Please upload an image",
        },
      },
    },
    category: {
      type: DataTypes.STRING,

      validate: {
        isIn: {
          args: [["office", "kitchen", "bedroom"]],
          msg: "validate value is not supported",
        },
      },
    },
    company: {
      type: DataTypes.STRING,

      validate: {
        isIn: {
          args: [["sony", "samsung", "xiaomi", "telecom"]],
          msg: "company value is not supported",
        },
      },
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["#222"],
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    freeShipping: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    averageRating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    numOfReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { tableName: "Product", modelName: "Product" }
);

const syncTable = async () => {
  Product.sync({ alter: true });
};
// syncTable();

User.hasMany(Product);
Product.belongsTo(User);
module.exports = { Product };
