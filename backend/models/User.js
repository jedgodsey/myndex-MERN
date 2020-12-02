const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  indexIDs: Array,
  email: String,
  familyName: String,
  givenName: String,
  googleId: String,
  imageUrl: String,
  name: String,
  company: String,
  logo: String,
  username: String,
  password: String
}, {timestaps: true})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
