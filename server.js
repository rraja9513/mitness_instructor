const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const session=require('express-session');
const passport=require('passport');
const Instructor=require('./models/instructor.model');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const port=process.env.PORT || 80;
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Atlas started successfully")
})
passport.use('instructorLocal',Instructor.createStrategy());
passport.serializeUser(Instructor.serializeUser());
passport.deserializeUser(Instructor.deserializeUser());
const instructorRouter=require('./routes/instructors');
const programRouter=require('./routes/programs');
const liveclassRouter=require('./routes/liveclasses');
app.use('/instructors',instructorRouter);
app.use('/programs',programRouter);
app.use('/liveclasses',liveclassRouter);
app.listen(port,function(){
    console.log("Server started Successfully");
});