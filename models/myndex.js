const mongoose = require('mongoose');

const myndexSchema = new mongoose.Schema({
  indexName: String,
  holdings: Array,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator'
  },
  weighting: {
    type: String,
    default: 'Even'
  },
  startDate: Date
}, {timestaps: true})

const Myndex = mongoose.model('Myndex', myndexSchema);

module.exports = Myndex;
