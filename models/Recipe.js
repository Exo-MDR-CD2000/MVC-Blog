const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Recipe extends Model {}


NAMEPENDING.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prep: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    cook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;
