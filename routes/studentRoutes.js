const express = require('express');
const router = express.Router();
const Student = require('./../models/Student');


//post method to add student details
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newStudent = new Student(data);

        const response = await newStudent.save();
        console.log("Student data saved successfully");
        res.status(200).json(response);

    }catch(err){
        console.log('Error : ',err);
        res.status(500).json({error : 'Internal Server error'});
    }
});

//get method for student details

router.get('/',async (req,res)=>{
    try{
        const data = await Student.find();
        console.log("Student data fetched successfully");
        res.status(200).json(data);

    }catch(err){
        console.log('Error : ',err);
        res.status(500).json({error : 'Internal Server error'});
    }
});

//get method with routes to find the details of student of particular dept
router.get('/:deptName',async (req,res)=>{
    try{
        const stdDept = req.params.deptName;

        if(stdDept=='cse' || stdDept=='ece' || stdDept=='mech' || stdDept=='civil'){  
            const data = await Student.find({dept : stdDept});
            console.log(`Department Data fetched succesfully`); 
            res.status(200).json(data);
        }else{
            res.status(404).json({error : "invalid work type"});
        }
    }catch(err){
        console.log(`Error : ${err}`);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

router.put('/:sid',async (req,res)=>{
    try{
        const studentId = req.params.sid;
        const updatedStudentId = req.body;

        const response = await Student.findByIdAndUpdate(studentId,updatedStudentId,{
            new : true,  // return the updated document
            runValidators : true  //run mongoose validator
        });
        
        if(!response){
            res.status(404).json({error : "student not found"});
        }

        console.log('Student data updated successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(`error : ${err}`);
        res.status(500).json({error : "Internal Server Error"})
    }
});

router.delete('/:sid',async (req,res)=>{

    try{
        const studentId = req.params.sid;
        const response =await  Student.findByIdAndDelete(studentId);

        if(!response){
            res.status(404).json({error : "Student not found"});
        }

        console.log("Student data deleted");
        res.status(200).json({message : "Student deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"})
    }

})

module.exports = router;