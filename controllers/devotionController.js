// const { connect } = require('../db')

// exports.getAll = (req, res) => {
//   connect('devotions/fr.SQLite3').all(
//     `
//   SELECT * FROM devotions
//   `,
//     (err, rows) => {
//       if (err) return next(new AppError(err.message, 500))
//       return res.json({ ok: true, results: rows.length, code: 200, books: rows })
//     }
//   )
// }
