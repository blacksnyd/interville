'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    static associate(models) {
      Challenge.belongsTo(models.User, {
        foreignKey: 'creator_id',
        as: 'creator'
      });

      Challenge.belongsTo(models.City, {
        foreignKey: 'city_id',
        as: 'city'
      });

      Challenge.hasMany(models.ChallengeParticipation, {
        foreignKey: 'challenge_id',
        as: 'participations'
      });

      Challenge.hasMany(models.ChallengeComment, {
        foreignKey: 'challenge_id',
        as: 'comments'
      });
    }
  }

  Challenge.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cities',
          key: 'id'
        }
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'open'
      }
    },
    {
      sequelize,
      modelName: 'Challenge',
      tableName: 'challenges',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Challenge;
};


