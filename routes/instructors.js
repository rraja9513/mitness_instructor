const router=require('express').Router();
const passport=require('passport');
let Instructor=require('../models/instructor.model');
router.route('/').get((req, res) => {
    Instructor.find()
      .then(instructors => res.json(instructors))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/search').post((req, res) => {
    Instructor.find({firstname : req.body.firstname})
      .then(instructors => res.json(instructors))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/signup').post((req,res)=>{
    const Instructors=new Instructor({ firstname : req.body.firstname,lastname:req.body.lastname,email:req.body.email,role:req.body.role,age:req.body.age,weight:req.body.weight,height:req.body.height,gender:req.body.gender,phonenumber:req.body.phonenumber,career:req.body.career,introduction:req.body.introduction,briefhistory:req.body.briefhistory,specializedin:req.body.specializedin,status:req.body.status,posttype:req.body.posttype,numberofapplicants:req.body.numberofapplicants,numberofattendees:req.body.numberofattendees,numberofsubscribers:req.body.numberofsubscribers});   
        Instructor.register(Instructors,req.body.password,function(err,instructor){
            if(err)
            {
                var redir = { returnCode: "Failure",
                              returnMsg:"Instructor Already Registered"};
                              return res.json(redir);
              
            }
            else{
                passport.authenticate("instructorLocal")(req,res,function(){
                    if (req.user) {
                        res.status(200).json({ message: 'Successful Online Account Creation Informing That The Admin Will Review Your Profile And Will Get Back To You Within 48 Hours.'});
                  } else {
                    res.status(400).json({ message: 'SignupFailed' });
                  }
                });
            }
        })
    });
router.route('/login').post((req,res)=>{
    if(!req.body.email){
        res.json({success: false, message: "email was not given"})
      } else {
        if(!req.body.password){
          res.json({success: false, message: "Password was not given"})
        }else{
          passport.authenticate('instructorLocal', function (err, user, info) { 
             if(err){
               res.json({success: false, message: err})
             } else{
              if (! user) {
                var redir={
                    Code:"Fa",
                    Msg:"Login Failed"
                }
                return res.json(redir)
              } else{
                req.login(user, function(err){
                  if(err){
                    res.json({success: false, message: err})
                  }
                  else{
                      var redir={
                          Code:"Su",
                          Msg:"Login Success",
                          id:user._id
                      }
                      return res.json(redir)
                  }
                })
              }
             }
          })(req, res);
        }
      }
 });
 router.route('/forgotpassword').post((req,res)=>{
       Instructor.findOne({ email: req.body.email })
       .then((instructor) => {
           instructor.setPassword(req.body.password,(err, instructor) => {
               if (err) return next(err);
               instructor.save();
               res.status(200).json({ message: 'Successful Password Reset' });
           });
       })
       .catch((err)=>{
        res.json("Instructor  Not  Found")
      })
});
router.route('/changepassword').post((req,res)=>{
    if(req.isAuthenticated()){
    Instructor.findOne({ email: req.body.email })
    .then((instructor) => {
        instructor.changePassword(req.body.oldpassword, req.body.newpassword,(err, instructor) => {
            if (err) return next(err);
            instructor.save();
            res.status(200).json({ message: 'Password Change Successful' });
        });
    })
    .catch((err)=>{
        res.json("Instructor  Not  Found")
      })
}
else{
    res.redirect('/login');
}
});
router.route('/update/:id').post((req, res) => {
    if(req.isAuthenticated()){
    Instructor.findById(req.params.id)
      .then(instructor => {
        instructor.firstname = req.body.firstname;
        instructor.lastname = req.body.lastname;
        instructor.email = req.body.email;
        instructor.gender =req.body.gender;
  
        instructor.save()
          .then(() => res.json('Instructor updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        res.redirect('/login');
    }
  });
  router.route('/eupdate/:id').post((req, res) => {
    if(req.isAuthenticated()){
    Instructor.findById(req.params.id)
      .then(instructor => {
        instructor.firstname = req.body.firstname;
        instructor.briefhistory = req.body.briefhistory;
        instructor.profilepicture =req.body.profilepicture;
  
        instructor.save()
          .then(() => res.json('Instructor updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        res.redirect('/login');
    }
  });
  router.route('/:id').delete((req, res) => {
    Instructor.findByIdAndDelete(req.params.id)
      .then(() => res.json('Instructor deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
 module.exports=router;