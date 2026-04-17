const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();
const mongodb =require('./db/db')
const userRoutes = require('./routes/user.routes');
const riderRoutes = require('./routes/rider.router');

const cors = require('cors');
const cookieParser = require('cookie-parser');
mongodb()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/v1/user',userRoutes)
app.use('/v1/rider',riderRoutes)







module.exports = app;