

 const  planets  = require("../../models/planet.model");
//  const planets=[]
function getallPlanets(req,res) {
   return res.status(200).json(planets)
   
}

module.exports={
    getallPlanets
}