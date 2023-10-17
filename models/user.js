const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");
const userBcrypt = require("sequelize-bcrypt");
const jwt = require("jsonwebtoken");
const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Please enter a unique email",
      },
      validate: {
        notNull: {
          msg: "Please enter an email",
        },
        notEmpty: {
          msg: "Please enter an email",
        },
        isEmail: {
          msg: "Please enter a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a password",
        },
        notEmpty: {
          msg: "Please enter a password",
        },
        len: {
          args: [6],
          msg: "password requires at least 6 characters",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["admin", "user"]],
          msg: "role: admin or user",
        },
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          { name: this.name, email: this.email, role: this.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_LIFETIME,
          }
        );
      },
    },
  },
  { tableName: "User", modelName: "User" }
);

userBcrypt(User, {
  field: "password", // secret field to hash, default: 'password'
  rounds: 12, // used to generate bcrypt salt, default: 12
  compare: "authenticate", // method used to compare secrets, default: 'authenticate'
});

const syncTable = async () => {
  User.sync({ alter: true });
};
// syncTable();

module.exports = { User };
