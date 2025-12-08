'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city'
      });

      User.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class'
      });

      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Cities',
          key: 'id'
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Classes',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );

  return User;
};
