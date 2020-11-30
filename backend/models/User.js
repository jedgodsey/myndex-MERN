const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  indexIDs: Array,
  email: {
    type: String,
    unique: true
  },
  familyName: String,
  givenName: String,
  googleId: String,
  imageUrl: String,
  name: String,
  company: String,
  logo: String
}, {timestaps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
