const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");

const Review = sequelize.define(
  "Review",
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: "Please enter a rating",
        },
        notEmpty: {
          msg: "Please enter a rating",
        },
        min: 1,
        max: 5,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a title",
        },
        notEmpty: {
          msg: "Please enter a title",
        },
        len: {
          args: [2, 100],
          msg: "Description cannot be more than 100 characters",
        },
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please upload a comment",
        },
        notEmpty: {
          msg: "Please upload a comment",
        },
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
  },
  { tableName: "Review", modelName: "Review" }
);

const syncTable = async () => {
  Review.sync({ alter: true });
};
syncTable();

module.exports = { Review };
