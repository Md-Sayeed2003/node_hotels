const express = require('express');
const db = require('./db');

require('dotenv').config();
const passport = require('./auth');
// importing passport and passport-local for authentication


const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

// Middleware Function
// const logRequest = (req,res,next)=>{
//     console.log(`[${new Date().toLocaleString()}] Requested Made to ${req.originalUrl}`);
//     next();  // Move on to next phase
// }

// passport-local middleware for authentication


app.use(bodyParser.json());
// app.use(logRequest);


app.listen(port,()=>{
    console.log(`server is listening at port : ${port}`);
})

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',(req,res)=>{
    res.send(`<h1>welcome to hotel</h1>`);
});

app.get('/details',localAuthMiddleware,(req,res)=>{
    res.send(`<h1>Welcome to details page</h1>
             <ul>
                 <li>Name : Md Sayeed</li>
                 <li>Id : 22551</li>
                 <li>Age : 21</li>
                 <li>Full Stack Developer</li>
                 </ul>
        `)
});

//import the person router file
const personRoutes = require('./routes/personRoutes');

//middleware to connect personRoutes in index.js file
app.use('/person',localAuthMiddleware,personRoutes);


//imported the menu router file 
const menuRoutes = require('./routes/menuRoutes');

//use the router file using middleware
app.use('/menu',menuRoutes);


//import the router files
const studentRoutes = require('./routes/studentRoutes');

//use the router
app.use('/student',localAuthMiddleware,studentRoutes);


