const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.post('/',async (req,res)=>{

    try{
        // yaha par body-parser k wajah se data req.body m aa raha hai
        const data = req.body;// assuming the request body contains the person
 
        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);
 
        const response = await newPerson.save();
 
        console.log('data saved');
        res.status(200).json(response);
     
    }catch(err){
         console.log(err);
         res.status(500).json({error : 'Internal Server Error'});
    }
 
});


//get method to get the person

router.get('/', async (req,res)=>{
    try{
       const data = await Person.find();
       console.log("data fetched");
       res.status(200).json(data);
    }catch(err){
       console.log(err);
       res.status(500).json({error : "Internal server Error"});
    }
});

module.exports = router;