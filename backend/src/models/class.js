'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not une partie de Sequelize lifecycle.
     * Le fichier `models/index` appellera cette méthode automatiquement.
     */
    static associate(models) {
      // Une classe peut avoir plusieurs utilisateurs
      Class.hasMany(models.User, {
        foreignKey: 'classId',
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
      tableName: 'Classes',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );

  return Class;
};
