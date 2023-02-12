const sqlite3 = require('sqlite3').verbose();
const { Sequelize } = require('sequelize');

exports.connect = (file) => {
  const db = new sqlite3.Database(`./db/${file}`);
  return db;
};
exports.dbConnect = new Sequelize({
  dialect: 'sqlite',
  storage: './db/ATESPIEDSJESUS.SQLIte3',
});

// sequelize
//   .authenticate()
//   .then((res) => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });
exports.versions = () => {
  return [
    {
      language: 'ht',
      longLanguage: 'Creole',
      name: 'HCV',
      description: 'Haitian Creole Version',
      file: 'HCV.SQLite3',
    },
    {
      language: 'ht',
      longLanguage: 'Creole',
      name: 'HCB',
      description: 'Bib La, Haitian Creole Bible, 1985',
      file: 'HCB.SQLite3',
    },
    {
      language: 'fr',
      longLanguage: 'Français',
      name: 'FRC97',
      description: 'La Bible en français courant',
      file: 'FRC97.SQLite3',
    },
    {
      language: 'fr',
      longLanguage: 'Français',
      name: 'NBS',
      description: 'Nouvelle Bible Segond, 2002',
      file: 'NBS.SQLite3',
    },
    {
      language: 'fr',
      longLanguage: 'Français',
      name: 'LSG',
      description: 'Bible Segond 1910',
      file: 'LSG.SQLite3',
    },
  ];
};

// new sqlite3.Database(`ATESPIEDSJESUS.SQLite3`).get('select * from users', (error, row) => {
//   console.log(row);
// });
let query = '';
query = `
  create table favouriteSongs(
    id INTEGER PRIMARY KEY  not null ,
	  userId varchar(40) not null,
    songId varchar(40) not null ,
    title varchar(150) not null ,
    num integer not null ,
    categoryName varchar(50) not null ,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   UNIQUE(userId,songId)
)`;
// query = `
//   create table favouriteVerses(
//     id INTEGER PRIMARY KEY  not null ,
// 	    userId varchar(40) not null,
//     verses varchar(50) not null ,
//     texts varchar(500) not null ,
//     note varchar(200) ,
//     color varchar(15) ,
//     type varchar(10) not null ,
//     bookName varchar(20) not null,
//     chapter integer not null ,
//     createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// )`;
// createdAt datetime default DATE(),

// query = 'select * from   favouriteVerses';
// query = 'drop table   favouriteSongs';
// query =  "insert into favouriteVerses (userId,verses,texts,type,bookName,chapter) values('1','1,2','verses','note','bookName',10)";
// new sqlite3.Database(`ATESPIEDSJESUS.SQLite3`).get(query, (error, row) => {
//   if (error) console.log(error);
//   console.log(row);
// });
