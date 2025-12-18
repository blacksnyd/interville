'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * Cette méthode est appelée automatiquement par `models/index`.
     */
    static associate(models) {
      User.belongsTo(models.City, {
        foreignKey: 'city_id',
        as: 'city'
      });

      User.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'class'
      });

      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });

      // Challenges créés par l'utilisateur
      User.hasMany(models.Challenge, {
        foreignKey: 'creator_id',
        as: 'createdChallenges'
      });

      // Challenges auxquels l'utilisateur participe
      User.belongsToMany(models.Challenge, {
        through: models.ChallengeParticipation,
        foreignKey: 'user_id',
        otherKey: 'challenge_id',
        as: 'participatingChallenges'
      });

      // Messages de chat envoyés par l'utilisateur
      User.hasMany(models.ChatMessage, {
        foreignKey: 'user_id',
        as: 'chatMessages'
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
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id'
        }
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return User;
};
