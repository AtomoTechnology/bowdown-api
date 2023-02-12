const SongCategory = require('../schemas/songCategory');
const factory = require('./factoryController');

exports.GetAll = factory.all(SongCategory);
exports.Create = factory.create(SongCategory, ['name', 'abbreviation', 'slug']);
exports.FindOne = factory.findOne(SongCategory);

exports.Bulk = async (req, res) => {
  await SongCategory.bulkCreate([
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
  ]);

  res.json({
    ok: true,
  });
};
