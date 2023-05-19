const express=require("express")
const router=express.Router()
const {signup,login,updateuser }=require("../controllers/user.cont")
const jwtchecker=require("../middleware/jwtcheck")
router.post("/api/signup",signup)
router.post("/api/login",login)
router.put("/api/update",jwtchecker,updateuser)


module.exports=router