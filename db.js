const mongoose = require('mongoose');

//define mongoDB connection url

const mongoURL = `mongodb://localhost:27017/hotels`;

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