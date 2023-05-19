const express=require("express")
const router=express.Router()
const {signup,login,updateuser,dltuser }=require("../controllers/user.cont")
const jwtchecker=require("../middleware/jwtcheck")

router.post("/api/signup",signup)
router.post("/api/login",login)
router.put("/api/update",jwtchecker,updateuser)
router.delete("/api/delete/:email/:password", jwtchecker,dltuser)


module.exports=router