const mongoose = require('mongoose');

const myndexSchema = new mongoose.Schema({
  indexName: String,
  holdings: Array
}, {timestaps: true})

const Index = mongoose.model('Index', myndexSchema);

module.exports = Index;
