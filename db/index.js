const sqlite3 = require('sqlite3').verbose()
const { Sequelize } = require('sequelize')

exports.connect = (file) => new sqlite3.Database(`./db/${file}`)

exports.dbConnect = new Sequelize({
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  database: 'atespiedsjesus',
  host: 'localhost',
  username: process.env.NODE_ENV === 'development' ? 'root' : '',
  password: process.env.NODE_ENV === 'development' ? 'jhm.ok' : '',
  define: {
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
  // storage: './db/atespiedsjesus.SQLite3'
})
