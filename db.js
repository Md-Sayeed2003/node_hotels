const mongoose = require('mongoose');
require('dotenv').config();

//define mongoDB connection url

const mongoURL = process.env.LOCAL_DB_URL;   // mongodb local url 
 

// const mongoURL = process.env.DB_URL ;  // mongodb online url using atlas

mongoose.connect(mongoURL);
//Get the default connection
//Mongoose maintain a default connection object representing the MongoDB

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log("MongoDB connection error : ",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

//export the database connection

module.exports = db;