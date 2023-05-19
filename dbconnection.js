const mongoose=require("mongoose")
 const dbconnected=async ()=>{
    try{
      await  mongoose.connect("mongodb://127.0.0.1:27017/Social_Media")
      console.log("DB is connected")
    }catch(e){
        console.log("error for DB connection")
    }
   
}
module.exports=dbconnected