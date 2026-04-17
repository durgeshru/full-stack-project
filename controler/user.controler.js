const usermodel = require('../modals/user.modal');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      // ✅ Extract correct fields once
      const { fullname, email, mobileNumber, password } = req.body;

      // ✅ Hash password
      const hashpassword = await usermodel.hashPassword(password);

      // ✅ Send correct data to service
      const user = await userService.createuser({
         firstname: fullname.firstname,
         lastname: fullname.lastname,
         email,
         mobileNumber,
         password: hashpassword
      });

      console.log(user);

      const token = user.generateAuthToken();

      res.status(201).json({ user, token });

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
};


module.exports.login = async (req, res, next) => {

   const errors=validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const {email,password} = req.body;

   const user= await usermodel.findOne({email}).select('+password');

   if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
   }

   const ismatch = await user.comparePassword(password);

   if (!ismatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
   }

   const token = user.generateAuthToken();

   res.cookie('token', token, { secure: true,maxAge: 24 * 60 * 60 * 1000 })

   res.status(200).json({ user, token, message: 'Login successful' });

};


module.exports.profile= async(req,res,next)=>{
   res.status(200).json({ user: req.user , message: 'Profile fetched successfully' });
}