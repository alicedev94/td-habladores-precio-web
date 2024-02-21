const { Sequelize, Model, DataTypes } = require("sequelize");

const table_name = "SUCURSALES";

const sucurSchema = {
  sucur: {
    field: "Nombre_sucursal",
    allowNull: false,
    type: DataTypes.STRING,
  },
  idSucursal: {
    field: "Id_sucursal",
    allowNull: false,
    type: DataTypes.STRING,
  },
  userCrea: {
    field: "Usuario_creacion",
    allowNull: true,
    type: DataTypes.STRING,
  },
  userMod: {
    field: "Usuario_modificacion",
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Sucur extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: table_name,
      modelName: "Sucurs",
    };
  }
}

module.exports = {
  table_name,
  sucurSchema,
  Sucur,
};
