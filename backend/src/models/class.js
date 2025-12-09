'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {

    static associate(models) {
      Class.hasMany(models.User, {
        foreignKey: 'class_id',
        as: 'users'
      });
    }
  }

  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    {
      sequelize,
      modelName: 'Class',
      tableName: 'classes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Class;
};
