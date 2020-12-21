// imports
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require('./models');
const bcrypt = require('bcryptjs');
const path = require('path');

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
