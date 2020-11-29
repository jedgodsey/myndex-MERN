const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  indexIDs: Array
}, {timestaps: true})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
