const express=require("express")
const {httpGetallLaunches,httpaddNewLaunch}=require("./launches.controller")
const launchesRouter=express.Router()
launchesRouter.get('/',httpGetallLaunches)
launchesRouter.post('/',httpaddNewLaunch)
module.exports=  launchesRouter
