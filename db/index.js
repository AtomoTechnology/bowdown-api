const sqlite3 = require('sqlite3').verbose();

exports.connect = (file) => {
  const db = new sqlite3.Database(`./db/${file}`);
  return db;
};

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
