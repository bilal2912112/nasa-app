const {launches}=require('../../models/launches.model')
function getallLaunches(req,res) {
return res.status(200).json(Array.from(launches.values()))
    
}
module.exports={
    getallLaunches
}