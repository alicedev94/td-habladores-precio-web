const { User, userSchema } = require("../models/users");

function setupModels(sequelize) {
  //User.init(userSchema, User.config(sequelize));
}

module.exports = setupModels;
