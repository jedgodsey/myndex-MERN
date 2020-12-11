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

const Index = mongoose.model('Index', myndexSchema);

module.exports = Index;

// we will see if name change takes.
