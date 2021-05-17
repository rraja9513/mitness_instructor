const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const instructorSchema=new Schema(
    {
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        role:{
            type: String,
            required: true,
        },
        profilepicture:{
            type: String,
        },
        age:{
            type: Number,
        },
        weight:{
            type:Number,
        },
        height:{
            type:Number,
        },
        gender:{
            type:String,
        },
        phonenumber:{
            type:String,
        },
        career:{
            type:String,
        },
        introduction:{
            type:String,
        },
        briefhistory:{
            type:String,
        },
        specializedin:{
            type:String,
        },
        status:{
            type:String,
        },
        posttype:{
            type:String,
        },
        numberofapplicants:{
            type:String,
        },
        numberofattendees:{
            type:String,
        },
        numberofsubscribers:{
            type:String,
        }
    },
    {
        timestamps:true,
    }
);
instructorSchema.plugin(passportLocalMongoose,{usernameField: 'email'});
const Instructor=mongoose.model('Instructor',instructorSchema);
module.exports=Instructor;