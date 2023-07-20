const mongoose=require("mongoose")
const DB_URL=process.env.MONGO_URL

mongoose.connection.once('open',()=>{
    console.log("Mongodb connection ready");
})
mongoose.connection.on('error',(err)=>{
    console.error(err)
})
async function mongoConnect() {
   await mongoose.connect(DB_URL,{
        useNewUrlParser:true,
       
        useUniFiedTopology:true,
    })
}
async function mongoDisconnect() {
    await mongoose.disconnect()
}
module.exports={
    mongoConnect,
    mongoDisconnect
}