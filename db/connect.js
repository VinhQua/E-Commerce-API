const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRE_URL);
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(`connected to DB`);
  } catch (error) {
    console.log(`can't connect to DB`);
  }
};

module.exports = { connect, sequelize };
