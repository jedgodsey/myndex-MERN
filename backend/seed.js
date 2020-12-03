require('dotenv').config();
const db = require('./models');
const seedIndeces = [
  {
    indexName: 'Test Index One',
    holdings: ['MMM', 'ABT', 'ABBV', 'ABMD', 'ACN', 'ATVI', 'ADBE'],
    weighting: 'Even',
    startDate: Date
  }
]

db.Myndex.deleteMany((err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    console.log(result);
    db.Myndex.create(seedIndeces, (err, newIndeces) => {
      if (err) {
        console.log(err);
      }
      console.log(newIndeces);
      process.exit();
    });
});
