const AppError = require('../helpers/AppError');
const catchAsync = require('../helpers/catchAsync');
const Song = require('../schemas/song');
const SongCategory = require('../schemas/songCategory');
const User = require('../schemas/user');
const { songs } = require('./chantDesperans');
const factory = require('./factoryController');
const slugify = require('slugify');

exports.GetAll = factory.all(Song, { include: [{ model: SongCategory }] });

exports.Create = factory.create(Song, [
  'title',
  'num',
  'video',
  'lyrics',
  'songId',
  'lyricsHtml',
  'language',
  'likes',
  'views',
  'slug',
  'SongCategoryId',
]);

let books = [
  {
    id: 1,
    uuid: '63c7077f7e0b612ee4c7e96c',
    name: 'Mélodies Joyeuses',
    slug: 'melodies-joyeuses',
    abbreviation: 'MJ',
    createdAt: '2023-02-11T14:13:21.480Z',
    updatedAt: '2023-02-11T14:13:21.480Z',
  },
  {
    id: 2,
    uuid: '63c707807e0b612ee4c7e96e',
    name: 'La Voix du Réveil',
    slug: 'la-voix-du-reveil',
    abbreviation: 'VR',
    createdAt: '2023-02-11T14:13:21.481Z',
    updatedAt: '2023-02-11T14:13:21.481Z',
  },
  {
    id: 3,
    uuid: '63c707807e0b612ee4c7e970',
    name: 'Échos des Élus',
    slug: 'echos-des-elus',
    abbreviation: 'EE',
    createdAt: '2023-02-11T14:13:21.482Z',
    updatedAt: '2023-02-11T14:13:21.482Z',
  },
  {
    id: 4,
    uuid: '63c707807e0b612ee4c7e972',
    name: 'Haïti Chante avec Radio Lumière',
    slug: 'haiti-chante-avec-radio-lumiere',
    abbreviation: 'HC',
    createdAt: '2023-02-11T14:13:21.484Z',
    updatedAt: '2023-02-11T14:13:21.484Z',
  },
  {
    id: 5,
    uuid: '63c707807e0b612ee4c7e974',
    name: 'Réveillons-nous Chrétiens',
    slug: 'reveillons-nous-chretiens',
    abbreviation: 'RN',
    createdAt: '2023-02-11T14:13:21.485Z',
    updatedAt: '2023-02-11T14:13:21.485Z',
  },
  {
    id: 6,
    uuid: '63c707807e0b612ee4c7e976',
    name: "Gloire à l'agneau",
    slug: "gloire-a-l'agneau",
    abbreviation: 'GA',
    createdAt: '2023-02-11T14:13:21.485Z',
    updatedAt: '2023-02-11T14:13:21.485Z',
  },
  {
    id: 7,
    uuid: '63c7077f7e0b612ee4c7e96a',
    name: "Chant d'Espérance",
    slug: "chant-d'esperance",
    abbreviation: 'CE',
    createdAt: '2023-02-11T14:13:21.477Z',
    updatedAt: '2023-02-11T14:13:21.477Z',
  },
];
exports.bulk = catchAsync(async (req, res) => {
  let songsBook = songs.map((s) => ({
    SongCategoryId: books.find((b) => b.name === s.book.name).id,
    views: 0,
    likes: 0,
    title: s.title,
    lyrics: s.lyrics,
    num: s.num,
    videos: null,
    language: s.language,
    songId: s.songId,
    lyricsHtml: s.lyrics_Markdown.html,
    slug: slugify(s.title),
  }));

  await Song.bulkCreate(songsBook);
  res.status(201).json({
    status: 'success',
    ok: true,
    result: songsBook.length,
  });
});

exports.CreateMultiples = catchAsync(async (req, res, next) => {
  res.status(201).json({ ok: true });
});

exports.GetOneSong = factory.findOne(Song, {
  include: [{ model: User }],
});

exports.addLikes = catchAsync(async (req, res, next) => {
  const doc = await Song.findByPk(req.params.id);
  if (!doc) {
    return next(new AppError('No document with that ID ', 404));
  }
  const newDoc = await Song.update(
    { likes: doc.likes + 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    ok: true,
    data: { data: newDoc },
  });
});

exports.addViews = catchAsync(async (req, res, next) => {
  const doc = await Song.findByPk(req.params.id);

  if (!doc) {
    return next(new AppError('No document with that ID ', 404));
  }
  const newDoc = await Song.update(
    { views: doc.views + 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    ok: true,
    code: 200,
    data: { data: newDoc },
  });
});
