const { Sequelize, Model, DataTypes } = require("sequelize");

const table_name = "Users";

const userSchema = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  creteAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "update_date",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: table_name,
      modelName: "Users",
      timestamps: false,
    };
  }
}

module.exports = {
  table_name,
  userSchema,
  User,
};
