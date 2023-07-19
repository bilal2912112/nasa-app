const express=require("express")
const launchesRouter=require('./launches/launches.router.js')
const planetRouter = require('./planets/planet.router.js');
const api=express.Router()
api.use('/planets',planetRouter);
api.use('/launches',launchesRouter);
module.exports=    api
