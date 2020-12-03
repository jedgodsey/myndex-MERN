// imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require('dotenv').config()
const db = require('./models');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const port = process.env.PORT || 4000; //add ENV?
const app = express();

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


// middleware - JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser(process.env.SECRET))
require('./passportConfig')(passport);

// middleware - API routes
app.use("/myndeces", routes.myndeces);
app.use("/users", routes.users);


// function isLoggedIn(req, res, next){
//   console.log('req.user in server: ', req.isAuthenticated())
//   if(req.isAuthenticated()){
//       return next();
//   }
// }

app.get('/login', (req, res, next) => { // why next?
  passport.authenticate('local', (err, user, info) => {
    console.log('login id: ', user._id)
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

//---------------testing

// app.get("/myndeces", (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     console.log('req.login? ', req.sessionID)
//     db.Myndex.find({})
//       .then(foundIndeces => {
//         res.json({indeces: foundIndeces})
//       })
//       .catch(err => {
//         console.log('myndex index error: ', err)
//         res.json({Error: 'unable to get your data'})
//       })
//   })(req, res, next) // why (req, res, next) here?
// });

//-------------------

app.post('/register', (req, res) => {
  console.log('register req.body: ', req.body)
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
  console.log('req.user: ', req.user)
  res.send(req.user); // the req.user stores the entire user that has been authenticated inside of it.
})

app.get('/logout', (req, res) => {
  console.log('logout req: ', req)
  console.log('logout res: ', res)
  req.logout();
  res.redirect('/')
})

//-------------------testing this out------------------------

// app.get("/myndeces", (req, res) => {
//   console.log('your req: ', req.user)
//   console.log('your req: ', req.body)
//   console.log('your req: ', req.params)
//   db.Myndex.find({})
//     .then(foundIndeces => {
//       res.json({indeces: foundIndeces})
//     })
//     .catch(err => {
//       console.log('myndex index error: ', err)
//       res.json({Error: 'unable to get your data'})
//     })
// });



// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
