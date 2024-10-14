const express = require('express');
const db = require('./db')
require('dotenv').config();

const Person = require('./models/Person');
const Menu = require('./models/Menu');

const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`server is listening at port : ${port}`);
})

app.get('/',(req,res)=>{
    res.send(`<h1>welcome to home page</h1>`);
});

app.get('/details',(req,res)=>{
    res.send(`<h1>Welcome to details page</h1>
             <ul>
                 <li>Name : Md Sayeed</li>
                 <li>Id : 22551</li>
                 <li>Age : 21</li>
                 <li>MERN Stack Developer</li>
                 </ul>
        `)
});

//import the person router file
const personRoutes = require('./routes/personRoutes');

//middleware to connect personRoutes in index.js file
app.use('/person',personRoutes);


//imported the menu router file 
const menuRoutes = require('./routes/menuRoutes');

//use the router file using middleware
app.use('/menu',menuRoutes);


//import the router files
const studentRoutes = require('./routes/studentRoutes');

//use the router
app.use('/student',studentRoutes);


