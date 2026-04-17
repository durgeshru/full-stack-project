const usermodel = require("../modals/user.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports.authuser= async (req,res,next)=>{
   const token=req.cookies.token || req.headers.authorization.split(" ")[1];
   try{
      const decode=jwt.verify(token,process.env.Jwt_Key);
      req.user=await usermodel.findById(decode._id);
      next();
   }catch(error){
      res.status(401).json({message:"Invalid token"});
   }  
};
