const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const usercontroler = require('../controler/user.controler')
const { authuser } = require('../Middleware/Auth.user')


router.post('/register', [
   body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

   body("email")
      .isEmail()
      .withMessage("Email must be valid"),

   body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

   body("mobileNumber")
      .isLength({ min: 10, max: 10 })
      .withMessage("Enter valid mobile number")], usercontroler.register)



      router.post('/login',[
         body("email").isEmail().withMessage("Email must be valid"),

         body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .withMessage("Email must be valid"),
      ] , usercontroler.login)


      router.post('/profile', authuser, [

      ],usercontroler.profile)

      router.post('/logout', authuser, usercontroler.logout)

module.exports = router


