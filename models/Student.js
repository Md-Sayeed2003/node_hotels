const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    dept : {
        type : String,
        enum : ['cse','ece','mech','civil'],
        required : true
    }
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;