const express=require("express");
const { getallPlanets } = require("./planet.controller");
const planetRouter=express.Router();
 planetRouter.get('/planets',getallPlanets);

module.exports=planetRouter
