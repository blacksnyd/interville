'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChallengeParticipation extends Model {
    static associate(models) {
      ChallengeParticipation.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      ChallengeParticipation.belongsTo(models.Challenge, {
        foreignKey: 'challenge_id',
        as: 'challenge'
      });
    }
  }

  ChallengeParticipation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      challenge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'challenges',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ChallengeParticipation',
      tableName: 'challenge_participations',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ChallengeParticipation;
};


