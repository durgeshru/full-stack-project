const riderModel = require("../modals/rider.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlacklistToken = require("../modals/blacklist.token");


module.exports.authrider = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   
   if (!token) {
      return res.status(401).json({ message: "No token provided" });
   }
   
   try {
      // Check if token is blacklisted
      const isBlacklisted = await BlacklistToken.findOne({ token });
      if (isBlacklisted) {
         return res.status(401).json({ message: "Token has been revoked" });
      }
      
      const decode = jwt.verify(token, process.env.Jwt_Key);
      req.rider = await riderModel.findById(decode._id);
      next();
   } catch (error) {
      res.status(401).json({ message: "Invalid token" });
   }
};
