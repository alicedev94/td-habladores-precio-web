const { Sequelize, Model, DataTypes } = require("sequelize");

const table_name = "AUTH";

const userSchema = {
  email: {
    field: "Correo_Electronico",
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    field: "Contraseña",
    allowNull: false,
    type: DataTypes.STRING,
  },
  rol: {
    field: "Rol",
    allowNull: false,
    type: DataTypes.STRING,
  },
  idSucursal: {
    field: "Id_Sucursal",
    allowNull: false,
    type: DataTypes.STRING,
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
    };
  }
}

module.exports = {
  table_name,
  userSchema,
  User,
};
