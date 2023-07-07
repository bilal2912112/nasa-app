const express=require("express")
const {getallLaunches}=require("./launches.controller")
const launchesRouter=express.Router()
launchesRouter.get('/launches',getallLaunches)
module.exports=  launchesRouter
