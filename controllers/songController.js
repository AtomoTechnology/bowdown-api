const catchAsync = require('../helpers/catchAsync');
const Song = require('../model/songModel');
const { songs } = require('./chantDesperans');
const factory = require('./handlerFactory');

exports.GetAll = factory.getAll(Song);

exports.Create = factory.createOne(Song);

let books = [
  {
    _id: '63c7077f7e0b612ee4c7e96a',
    name: "Chant d'Espérance",
    abbreviation: 'CE',
    slug: "chant-d'esperance",
  },
  {
    _id: '63c7077f7e0b612ee4c7e96c',
    name: 'Mélodies Joyeuses',
    abbreviation: 'MJ',
    slug: 'melodies-joyeuses',
  },
  {
    _id: '63c707807e0b612ee4c7e96e',
    name: 'La Voix du Réveil',
    abbreviation: 'VR',
    slug: 'la-voix-du-reveil',
  },
  {
    _id: '63c707807e0b612ee4c7e970',
    name: 'Échos des Élus',
    abbreviation: 'EE',
    slug: 'echos-des-elus',
  },
  {
    _id: '63c707807e0b612ee4c7e972',
    name: 'Haïti Chante avec Radio Lumière',
    abbreviation: 'HC',
    slug: 'haiti-chante-avec-radio-lumiere',
  },
  {
    _id: '63c707807e0b612ee4c7e974',
    name: 'Réveillons-nous Chrétiens',
    abbreviation: 'RN',
    slug: 'reveillons-nous-chretiens',
  },
  {
    _id: '63c707807e0b612ee4c7e976',
    name: "Gloire à l'agneau",
    abbreviation: 'GA',
    slug: "gloire-a-l'agneau",
  },
];

exports.CreateMultiples = catchAsync(async (req, res, next) => {
  let id = '';
  let songsBook = songs.map((s) => ({
    book: books.find((b) => b.name === s.book.name)._id,
    views: 0,
    likes: 0,
    title: s.title,
    lyrics: s.lyrics,
    num: s.num,
    videos: [],
    language: s.language,
    songId: s.songId,
    lyricsMarkdown: s.lyrics_Markdown.md,
    lyricsHtml: s.lyrics_Markdown.html,
  }));

  // console.log(songsBook);

  // console.log(req.body);
  for (let i = 0; i < songsBook.length; i++) {
    await Song.create(songsBook[i]);
  }

  res.status(201).json({
    status: 'success',
    ok: true,
    result: songsBook.length,
    // data: songsBook,
    // books,
    message: 'Registros insertados con exito !',
  });
});

exports.deleteSong = factory.deleteOne(Song);
exports.updateSong = factory.updateOne(Song);
exports.GetOneSong = factory.getOne(Song, { path: 'book' });
