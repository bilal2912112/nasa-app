const express = require("express");
const cors = require("cors");
const api = require("./routes/api");
const path=require('path')

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(   __dirname,'..','public')))
app.use('/v1',api)
module.exports = app;
