const { User, userSchema } = require("../models/users");
const { List, listSchema } = require("../models/priceList");

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  List.init(listSchema, List.config(sequelize));
}

module.exports = setupModels;
