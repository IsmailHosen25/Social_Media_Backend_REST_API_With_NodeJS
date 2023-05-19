require("dotenv").config()
const jwt=require("jsonwebtoken")
const checkjwt=(req,res,next)=>{
    const {authorization}=req.headers
    try{
          const token=authorization.split(" ")[1]
          const decoded=jwt.verify(token,process.env.TOKEN_SECRET_CODE)

          const  {username,id}=decoded
          req.username=username
          req.id=id
          next()
    }catch{
        next()
    }

}
module.exports=checkjwt