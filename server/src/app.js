const express = require("express");
const cors = require("cors");
const launchesRouter=require('./routes/launches/launches.router.js')
const planetRouter = require('./routes/planets/planet.router.js');
const app = express();




app.use(cors(
  {
    origin:'http://localhost:3000'
  }
));
app.use(express.json());
app.use('/planets',planetRouter);
app.use('/launches',launchesRouter);


module.exports = app
  







