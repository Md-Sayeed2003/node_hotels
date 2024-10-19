const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new localStrategy(async(USERNAME,PASSWORD,done)=>{
    try{
        // console.log("Received credentails : ",USERNAME,PASSWORD);
        const user = await Person.findOne({username:USERNAME});

        if(!user)
            return done(null,false,{message : 'Incorrect username'});

        const idPasswordMatch = await user.comparePassword(PASSWORD);
        
        if(idPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message : "Incorrect password"});
        }
    }catch(err){
        return done(err);
    }
}));

module.exports = passport; // export configured passport