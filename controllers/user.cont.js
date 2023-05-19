require("dotenv").config()
const userModel=require('../models/usermodel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const signup=async(req,res)=>{
    const username=req.body.username
    const email=req.body.email
    const password= await bcrypt.hash(req.body.password, 10)
  
    try{
        const userNameExist=await userModel.findOne({username:username})
        const userExist=await userModel.findOne({email:email})
        if(userNameExist){
          return  res.status(202).send({message:"this usernamae is exist, plese try another username"})
        }
        else{
            if(userExist){
              return  res.status(202).send({message:"valid user"})
            }
            else{
                const data = userModel({
                    username,email,password
                })
                const user=await data.save()
                if(user){
                  return   res.status(201).send({message:"saved"})
                }
                else{
                 return   res.status(400).send({
                          message:"please try again"
                    })
                }
            }
              
        }
    }catch(e){
     return   res.status(404).send({message:e.message})
    }
}



const login=async(req,res)=>{
        const email=req.body.email
        const username=req.body.username
       try{


        if(email){

          const user=await userModel.findOne({email:email})
          if(user){
            const passwordvalidation= await bcrypt.compare(req.body.password, user.password)
            if(passwordvalidation){

            const token=jwt.sign({
              username:user.username,
              id:user._id
            }, process.env.TOKEN_SECRET_CODE, {expiresIn:"2d"})


            return res.status(200).send({message:"success",token:"Bearer "+token})


            }else{
            return  res.status(401).send({message:"unauthorized"})
            }
        }
        else{
        return  res.status(401).send({message:"not valid user , please signup first"})
        }
                 
        }
        else if(username){
            const user=await userModel.findOne({username:username})
            if(user){
              const passwordvalidation= await bcrypt.compare(req.body.password, user.password)
              if(passwordvalidation){

              const token=jwt.sign({
                username:user.username,
                id:user._id
              }, process.env.TOKEN_SECRET_CODE, {expiresIn:"2d"})


              return res.status(200).send({message:"success",token:"Bearer "+token})


              }else{
              return  res.status(401).send({message:"unauthorized"})
              }
          }
          else{
          return  res.status(401).send({message:"not valid user , please signup first"})
          }

        }else{
          return res.status(404).send({message:"emapty form"})
        }
            
       }catch(e){
       return res.status(404).send({message:e.message})
       }
}

const updateuser=async (req,res)=>{
  const username=req.username
  const id=req.id
  const firstname=req.body.firstname
  const lastname=req.body.lastname
try{
    const userExist=await userModel.findOne({$and:[{username:username},{_id:id}]})
    if(userExist){
         
      const updateuser=await userModel.findByIdAndUpdate({_id:userExist._id},
        {
          $set:{
            firstname:firstname,
            lastname:lastname
          }
        },
        {new:true}
        
        )
        if(updateuser){
          return res.status(200).send({message:"updated"})
        }else{
          return res.status(203).send({message:"not updated, please try again"})
        }
        
    }else{
     return  res.status(204).send({message:"token expired"})
    }
  

}catch(e){

return  res.status(404).send({message:e.message})

}
}

module.exports={signup,login,updateuser}