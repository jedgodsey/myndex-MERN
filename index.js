// imports
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require('./models');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const port = process.env.PORT || 4000;
const app = express();


// from tutorial at https://jarednielsen.com/mern-deploy-heroku/
app.get('/', (req, res) => {
  res.send("Hello World!");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
//---------------------------------------------------------

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

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

app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// middleware - JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

// middleware - API routes
app.use("/myndeces", routes.myndeces);
app.use("/users", routes.users);

app.post('/login', (req, res, next) => { // why next?
  passport.authenticate('local', (err, user, info) => {
    console.log('top user: ', user)
    if (err) throw err;
    if (!user) res.send('no user exists');
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.send('successfully authenticated');
      })
    }
  })(req, res, next) // why (req, res, next) here?
})

app.post('/register', (req, res) => {
  console.log('register req.user', req.user)
  db.User.findOne({username: req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('user already exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
  console.log('getUser req: ', req)
  res.send(req.user); // the req.user stores the entire user that has been authenticated inside of it.
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
