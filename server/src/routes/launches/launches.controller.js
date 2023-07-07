const {getallLaunches,addnewLaunch}=require('../../models/launches.model')
function httpGetallLaunches(req,res) {
return res.status(200).json(getallLaunches())
    
}
function httpaddNewLaunch(req,res) {
    const launch=req.body;
    if(!launch.mission||!launch.rocket||!launch.launchDate||!launch.target){
        return res.status(400).json({
            error:"Missing required  properties"
        })
    }
    launch.launchDate=new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid Date"
        })
    }
    addnewLaunch(launch)
    return res.status(201).json(launch)
}
module.exports={
    httpGetallLaunches,
    httpaddNewLaunch
}   