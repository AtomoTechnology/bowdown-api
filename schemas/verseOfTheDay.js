const { DataTypes } = require('sequelize')
const { dbConnect } = require('./../db/index')
const VerseDay = dbConnect.define(
  'VerseDay',
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
    version: {
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
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    verse: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.JSON,
      allowNull: false
    }
  },
  {
    tableName: 'verseofthedays',
    modelName: 'VerseDay',
    timestamps: true
  }
)

module.exports = VerseDay
