   const mongoose = require('mongoose');
   const bcrypt = require('bcrypt');
   const jwt = require('jsonwebtoken');





   const UserSchema = new mongoose.Schema({
      fullname: {
         firstname: {
            type: String,
            required: true,
            minlength: 3
         },
         lastname: {
            type: String,
            minlength: 3
         }
      },

      email: {
         type: String,
         required: true,
         unique: true
      },

      mobileNumber: {
         type: Number,
         required: true,
         unique: true
      },

      password: {
         type: String,
         select: false,
         required: true,
         minlength: 6

      },

      socketId: {
         type: String
      }

   })

   UserSchema.methods.generateAuthToken = function () {

      const token =jwt.sign({_id: this._id}, process.env.Jwt_Key)
      return token

   }

   UserSchema.methods.comparePassword = function (password) {
      return bcrypt.compareSync(password, this.password);
   }

   UserSchema.statics.hashPassword = async (password) => {
      return await  bcrypt.hashSync(password, 10);
   }


   module.exports = mongoose.model('User', UserSchema);


