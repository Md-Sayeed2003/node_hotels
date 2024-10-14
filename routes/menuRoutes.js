const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');


//post method to insert data in mongodb database
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new Menu(data);

        const response = await newMenu.save();
        console.log("Menu data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

//get method to fetch the menu data from database
router.get('/',async (req,res)=>{
    try{
        const data = await Menu.find();
        console.log("Menu data fetched successfully");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error "});

    }
});

module.exports = router;