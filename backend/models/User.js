const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
  imageUrl: String,
  name: String,
  company: String,
  logo: String,
  password: String
}, {timestaps: true})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
