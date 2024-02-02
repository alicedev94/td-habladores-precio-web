const { Sequelize, Model, DataTypes } = require("sequelize");

const table_name = "LISTA_PRECIO";

const listSchema = {
  title: {
    field: "Nombre_Lista",
    allowNull: false,
    type: DataTypes.STRING,
  },
  value: {
    field: "Id_Lista",
    allowNull: false,
    type: DataTypes.INTEGER(50),
  }
};

class List extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: table_name,
      modelName: "List",
    };
  }
}

module.exports = {
  table_name,
  listSchema,
  List,
};
