// const PORT=process.env.PORT||8000
// const http=require('http')
// const app=require("./app")
// const { loadPlanetData } = require('./models/planet.model.js')
// const server=http.createServer(app)
// async function startServer() {
//     await loadPlanetData()
//     server.listen(PORT,()=>{

//            console.log(`listning on Port ${PORT}`);
//     })

// }

// startServer() 
require('dotenv').config()
const PORT = process.env.PORT || 8000;

const cors = require("cors");
const express = require("express");
const { loadPlanetData } = require("./models/planet.model.js");
const {loadLaunchData}= require("./models/launches.model.js")
const app = require("./app.js");
const { mongoConnect } = require("./services/mongo.js");

app.use(express.json());

async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  await loadLaunchData();
  app.listen(PORT, () => {
    console.log(`our application is running at port ${PORT}`);
  });
}

startServer();
