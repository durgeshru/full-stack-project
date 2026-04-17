const express=require('express')
const router=express.Router()
const riderControler = require('../controler/rider.controler.js')
const {body} = require('express-validator')
const { authrider } = require('../Middleware/Auth.rider.js')


router.post('/register',[
   body('fullname.firstname').not().isEmpty(),
   body('email').isEmail(),
   body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
   body('vehicle.color').not().isEmpty().withMessage("entrer the color of the vehicle"),
   body('vehicle.number').not().isEmpty().withMessage("entrer the number of the vehicle"),
   body('vehicle.type').not().isEmpty().withMessage("entrer the type of the vehicle"),
   body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage("entrer the vehicle type of the vehicle"),


   ],
   riderControler.register)

router.post('/login', [
   body('email').isEmail().withMessage('Email must be valid'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], riderControler.login)

router.get('/profile', authrider, riderControler.profile)

router.post('/logout', authrider, riderControler.logout)




module.exports=router