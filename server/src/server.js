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
const DB_URL="mongodb+srv://bilaliqbal2912112:abcd1234@cluster0.1mw29ih.mongodb.net/"
const mongoose=require("mongoose")
const cors= require('cors');
const express = require("express");
const { loadPlanetData } = require('./models/planet.model.js')
const app =require('./app.js')

app.use(express.json());
mongoose.connection.once('open',()=>{
    console.log("Mongodb connection ready");
})
mongoose.connection.on('error',(err)=>{
    console.error(err)
})
 async function startServer() {
    await mongoose.connect(DB_URL,{
        useNewUrlParser:true,
       
        useUniFiedTopology:true,
    })
        await loadPlanetData()
        app.listen(PORT,()=>{
            console.log(`our application is running at port ${PORT}`)
        })
          
    }
    
    startServer()