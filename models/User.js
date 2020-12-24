const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
  imageUrl: String,
  name: String,
  givenName: String
}, {timestaps: true})

module.exports = mongoose.model('User', userSchema);
