const mongoose = require('mongoose');

const myndexSchema = new mongoose.Schema({
  indexName: String,
  holdings: Array
}, {timestaps: true})

module.exports = mongoose.model('Myndex', myndexSchema);
