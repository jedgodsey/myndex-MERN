// imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require('dotenv').config()
const ctrl = require('./controllers');
const db = require('./models');

//wood imports
const mongoose = require('mongoose');
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

//walk-with-me imports
// const session = require('express-session'); // repeat
const passport = require('passport');
const LocalStrategy = require('passport-local');

const port = process.env.PORT || 4000; //add ENV?
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

// wood middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// walk-with-me middleware + wood
app.use(session({
  secret: process.env.SECRET,
  resave: true, // change from walk... what does it do?
  saveUninitialized: true, // what does this do?
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


// middleware - JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

// wood
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// middleware - API routes
app.use("/myndeces", routes.myndeces);
app.use("/users", routes.users);

// wood routes
app.post('/login', (req, res, next) => { // why next?
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('no user exists');
    else {
      req.login(user, err => {
        if (err) throw err;
        res.send('successfully authenticated');
      })
    }
  })(req, res, next) // why (req, res, next) here?
})

app.post('/register', (req, res) => {
  console.log(req.body)
  db.User.findOne({username: req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('user already exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // "10 is the salt" "Adding 10, auto generates the Salt then uses it 10 rounds"
      const newUser = new db.User({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res.send('user creted');
    }
  })
})

app.get('/getUser', (req, res) => {
  res.send(req.user); // the req.user stores the entire user that has been authenticated inside of it.
})


// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));


// Mando Rodriguez ah, you probably have a typo somewhere in the code. A small error will cause this, also to redirect; in react you’re going to want to redirect after a successful post request to the login route 

// Axios.post(...<ALL THE CODE TO LOGIN>).then(res => if (res.status === 200) {
// window.location.href = “/favoritePage”
// )}

// You can just add a promise, which is the .then() function, so when it completed the post successfully “status === 200” you can redirect to any page you like. Just add window.location.href = “/nameOfPageRoute” ;

// Hopefully this makes sense.

// Yes sure! I can get on that. Logging out is easy. They have a method called req.logOut() and it logs you out of the session. So you can easiely just use that method on any request in express and req.logOut() will log you out.
