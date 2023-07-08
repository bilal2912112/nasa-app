const express=require("express")
const {httpGetallLaunches,httpaddNewLaunch,httpAbortLaunch}=require("./launches.controller")
const launchesRouter=express.Router()
launchesRouter.get('/',httpGetallLaunches)
launchesRouter.post('/',httpaddNewLaunch)
launchesRouter.delete('/:id',httpAbortLaunch)
module.exports=  launchesRouter
