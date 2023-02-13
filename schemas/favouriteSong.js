const { DataTypes } = require('sequelize');
const { dbConnect } = require('./../db/index');
const Song = require('./song');
const User = require('./user');
const FavouriteSong = dbConnect.define(
  'FavouriteSong',
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    SongId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Song,
        key: 'id',
      },
    },
  },
  {
    tableName: 'favouritesongs',
  }
);
FavouriteSong.belongsTo(Song);
FavouriteSong.belongsTo(User);
// return FavouriteSong;
module.exports = FavouriteSong;
