// imports
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require('./models');
const path = require('path');

const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = '596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'

const port = process.env.PORT || 4000;
const app = express();

let origin;
if (process.env.NODE_ENV === 'production') {
  origin = 'https://secure-lowlands-61590.herokuapp.com';
} else {
  origin = 'http://localhost:3000';
}

const corsOptions = {
  origin: origin,
  credentials: true
}

// middleware - JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

//codamn
const googleClient = new OAuth2Client(CLIENT_ID) //{clientId: CLIENT_ID})

app.post('/login', async (req, res) => {
  console.log('cookies: ', req.headers.cookie)
  const test = await verifyGoogleLogin(req.body.tokenObj.id_token)
  if (!test) {
    console.error('failed login with google')
  }
  console.log('google signin successful')
  db.User.findOne({email: req.body.email})
  .then(foundUser => {
    if (foundUser) {
      db.User.findByIdAndUpdate(foundUser.id, req.body)
        .then(updatedUser => res.json({user: updatedUser}))
        .catch(err => {
          console.log('error in update user: ', err)
          res.json({Error: 'unable to update data'})
        })
    } else {
      db.User.create(req.body)
        .then(newUser => {
          res.json({user: newUser})
        })
        .catch(err => {
          console.log('error in create user: ', err)
          res.json({Error: 'unable to create data'})
        })
    }
  })
})

async function verifyGoogleLogin(token) {
  const ticket = await googleClient.verifyIdToken({
    audience: CLIENT_ID,
    idToken: token
  })

  const payload = ticket.getPayload()

  if (payload) {
    return payload
  }
  return null
}

// middleware - API routes
app.use("/myndeces", routes.myndeces);
app.use("/users", routes.users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
