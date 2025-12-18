'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChallengeComment extends Model {
    static associate(models) {
      ChallengeComment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      ChallengeComment.belongsTo(models.Challenge, {
        foreignKey: 'challenge_id',
        as: 'challenge'
      });
    }
  }

  ChallengeComment.init(
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
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    {
      sequelize,
      modelName: 'ChallengeComment',
      tableName: 'challenge_comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ChallengeComment;
};


