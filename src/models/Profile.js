const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  indexIDs: Array
}, {timestaps: true})

module.exports = mongoose.model('Profile', profileSchema);
