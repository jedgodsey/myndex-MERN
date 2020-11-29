// imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const port = process.env.PORT || 4000; //add ENV?
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

// middleware - JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

// middleware - API routes
app.use("/myndeces", routes.myndeces);

// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
