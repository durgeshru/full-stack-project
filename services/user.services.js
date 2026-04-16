const usermodel = require('../modals/user.modal');

module.exports.createuser = async ({ firstname, lastname, email, mobileNumber, password }) => {

   // ✅ validation
   if (!firstname || !email || !mobileNumber || !password) {
      throw new Error("please fill all required fields");
   }

   // ✅ create user
   const user = await usermodel.create({
      fullname: {
         firstname: firstname,
         lastname: lastname
      },
      email: email,
      mobileNumber: mobileNumber,
      password: password
   });

   return user;
};