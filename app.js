const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();
const mongodb =require('./db/db')
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
mongodb()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/v1/user',userRoutes)







module.exports = app;