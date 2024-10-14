const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    price :{
        type : Number ,
        required : true,
        min : 10,
        max : 1000
    },
    is_drinked :{
        type : Boolean,
        required : true
    }
});

const Menu = mongoose.model('Menu',menuItemSchema);

module.exports = Menu;