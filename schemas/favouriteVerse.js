const { DataTypes } = require('sequelize');
const { dbConnect } = require('./../db/index');
const FavouriteVerse = dbConnect.define(
  'FavouriteVerse',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    // UserId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
    verses: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    texts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    version: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING(20),
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIn: [['HIGHLIGHT', 'NOTE', 'FAVOURITE']],
      },
    },
  },
  {
    tableName: 'favouritesverses',
  }
);

module.exports = FavouriteVerse;
