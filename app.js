const express=require("express")
const cors=require("cors")
const app=express()
const userRouter=require("./routes/user.rout")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/user",userRouter)


module.exports=app