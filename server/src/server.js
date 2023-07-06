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
const PORT=process.env.PORT||8000
const cors= require('cors');
const express = require("express");
const { loadPlanetData } = require('./models/planet.model.js')
const app =require('./app.js')

app.use(express.json());
 async function startServer() {
        await loadPlanetData()
        app.listen(PORT,()=>{
            console.log(`our application is running at port ${PORT}`)
        })
          
    }
    
    startServer()