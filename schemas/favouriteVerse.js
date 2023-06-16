const { DataTypes } = require('sequelize')
const { dbConnect } = require('./../db/index')
const FavouriteVerse = dbConnect.define(
  'FavouriteVerse',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId est obligatoire. '
        },
        notNull: {
          msg: 'UserId est obligatoire. '
        }

      }
    },
    verses: {
      type: DataTypes.STRING,
      allowNull: false
    },
    texts: {
      type: DataTypes.JSON,
      allowNull: false
    },
    bookName: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    bookNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    version: {
      type: DataTypes.JSON,
      allowNull: false
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: DataTypes.STRING,
    color: DataTypes.STRING(20),
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIn: {
          args: [['HIGHLIGHT', 'NOTE', 'FAVOURITE']],
          msg: 'Type must be either HIGHLIGHT, NOTE or FAVOURITE'
        }

      }
    }
  },
  {
    tableName: 'favouritesverses',
    modelName: 'FavouriteVerse',
    timestamps: true
  }
)

module.exports = FavouriteVerse
