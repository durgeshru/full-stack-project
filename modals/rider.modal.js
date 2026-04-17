const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const riderSchema=new mongoose.Schema({
   fullname:{
      firstname:{
         type:String,
         required:true
      },
      lastname:{
         type:String,

      }
   },

   email:{
      type:String,
      required:true,
      unique:true
   },

   password:{
      type:String,
      required:true,
      minlength:6
   },

   status:{
      type:String,
      enum:['active','inactive'],
      default:'active'
   },

   vehicle:{
      color:{
         type:String,
         required:true
      },
      plate:{
         type:String,
         required:true
      },

      capacity:{
         type:Number,
         required:true,
         min:[1,'Capacity must be at least 1']
      },

      vehicleType:{
         type:String,
         required:true,
         enum:['motorcycle','car','truck']
      }
   },

   location:{
      latitude:{
         type:Number,

      },
      longitude:{
         type:Number,
    
      }
   }
})


riderSchema.methods.generateAuthToken = async function () {
   const token = jwt.sign({ _id: this._id }, process.env.Jwt_Key, { expiresIn: '24h' });
   return token;
}

riderSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
}

riderSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('Rider', riderSchema);
