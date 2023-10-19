const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");

const SingleOrderItem = sequelize.define(
  "SingleItemOrder",
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter an amount",
        },
        notEmpty: {
          msg: "Please enter an amount",
        },
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Order",
        key: "id",
      },
    },
  },
  { tableName: "SingleOrderItem", modelName: "SingleOrderItem" }
);

const Order = sequelize.define(
  "Order",
  {
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: false,

      validate: {
        notNull: {
          msg: "Please enter a tax",
        },
        notEmpty: {
          msg: "Please enter a tax",
        },
      },
    },
    shippingFee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a shipping fee",
        },
        notEmpty: {
          msg: "Please enter a shipping fee",
        },
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a subtotal",
        },
        notEmpty: {
          msg: "Please enter a subtotal",
        },
      },
    },

    // orderItems: [SingleOrderItem],
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      validate: {
        isIn: {
          args: [["pending", "failed", "paid", "delivered", "canceled"]],
          msg: "validate value is not supported",
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
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a clientSecret",
        },
        notEmpty: {
          msg: "Please enter a clientSecret",
        },
      },
    },
    paymentIntent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a payment intent",
        },
        notEmpty: {
          msg: "Please enter a  payment intent",
        },
      },
    },
  },
  { tableName: "Order", modelName: "Order" }
);

const syncTable = async () => {
  SingleOrderItem.sync({ alter: true });
  Order.sync({ alter: true });
};
// syncTable();

module.exports = { Order };
