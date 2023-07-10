

 const  {getAllPlanets}  = require("../../models/planet.model");
//  const planets=[]
async function getallPlanets(req,res) {
   return res.status(200).json(await getAllPlanets())
   
}

module.exports={
    getallPlanets
}