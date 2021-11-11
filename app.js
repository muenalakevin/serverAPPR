require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const {dbConnect} = require('./config/mongo')
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//routes
app.use('/api/',require('./app/routes'))




//connection mongodb
dbConnect();
app.listen(PORT, ()=>{
    console.log('nodejs app run '+PORT)
})