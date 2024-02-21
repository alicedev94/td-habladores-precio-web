const { User, userSchema } = require("../models/users");
const { List, listSchema } = require("../models/priceList");
const { Sucur, sucurSchema } = require("../models/Sucur");

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  List.init(listSchema, List.config(sequelize));
  Sucur.init(sucurSchema, Sucur.config(sequelize));
}

module.exports = setupModels;
