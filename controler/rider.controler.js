const riderModel = require('../modals/rider.modal');
const riderService = require('../services/rider.services');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      // Extract fields from request body
      const { fullname, email, password, vehicle } = req.body;

      // Hash password
      const hashpassword = await riderModel.hashPassword(password);

      // Send data to service
      const rider = await riderService.createRider({
         fullname: fullname.firstname,
         lastname: fullname.lastname || '',
         email,
         password: hashpassword,
         vehicle: vehicle.type || 'car',
         color: vehicle.color,
         plate: vehicle.number,
         capacity: vehicle.capacity || 4,
         vehicleType: vehicle.vehicleType
      });

      const token = await rider.generateAuthToken();

      res.status(201).json({ 
         rider, 
         token,
         message: 'Rider registered successfully' 
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
};

module.exports.login = async (req, res, next) => {
   try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Validation failed' });
      }

      const { email, password } = req.body;

      const rider = await riderModel.findOne({ email }).select('+password');

      if (!rider) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await rider.comparePassword(password);

      if (!isMatch) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = await rider.generateAuthToken();

      res.status(200).json({ 
         rider, 
         token, 
         message: 'Login successful' 
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
};

module.exports.profile = async (req, res, next) => {
   try {
      if (!req.rider) {
         return res.status(404).json({ message: 'Rider not found' });
      }
      res.status(200).json({ 
         rider: req.rider, 
         message: 'Profile fetched successfully' 
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
};

module.exports.logout = async (req, res, next) => {
   try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
      
      if (!token) {
         return res.status(400).json({ message: "No token provided" });
      }
      
      // Add token to blacklist
      const BlacklistToken = require('../modals/blacklist.token');
      await BlacklistToken.create({ token });
      
      res.status(200).json({ 
         message: "Logout successful" 
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
};
