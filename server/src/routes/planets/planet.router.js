const express=require("express");
const { getallPlanets } = require("./planet.controller");
const planetRouter=express.Router();
 planetRouter.get('/planets',getallPlanets);
planetRouter.get('/getdata',(req,res)=>{
    res.send('Working!');
    console.log("this is working");
});

module.exports=planetRouter
