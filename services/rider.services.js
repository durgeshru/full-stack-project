const riderModel = require('../modals/rider.modal');

module.exports.createRider = async ({ fullname, lastname, email, password, vehicle, color, plate, capacity, vehicleType }) => {

   if (!fullname || !email || !password || !color || !plate || !vehicleType) {
      throw new Error("please fill all required fields");
   }

   return await riderModel.create({
      fullname: {
         firstname: fullname,
         lastname: lastname || ''
      },
      email,
      password,
      vehicle: {
         color,
         plate,
         capacity: capacity || 4,
         vehicleType
      }
   });
};
