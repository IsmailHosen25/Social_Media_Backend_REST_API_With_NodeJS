require("dotenv").config()
const app=require("./app")
const dbconnected=require("./dbconnection")
const port=process.env.PORT || 3000
app.listen(port,async()=>{
    console.log(`your server is running at http://localhost:${port}`)
    await dbconnected()
})