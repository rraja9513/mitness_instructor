const router=require('express').Router();
const passport=require('passport');
let Instructor=require('../models/instructor.model');
router.route('/').get((req, res) => {
    Instructor.find()
      .then(instructors => res.json(instructors))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/signup').post((req,res)=>{
    const Instructors=new Instructor({ firstname : req.body.firstname,lastname:req.body.lastname,email:req.body.email,role:req.body.role});   
        Instructor.register(Instructors,req.body.password,function(err,instructor){
            if(err)
            {
                console.log(err);
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
    const instructor=new Instructor({
        email:req.body.email,
        password:req.body.password
    });
    req.login(instructor,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("instructorLocal")(req,res,function(){
                if (req.user) {
                    var redir = { redirect: "/HomePage" };
                    return res.json(redir);
              } else {
                res.status(400).json({ message: 'Credentials Are Incorrect' });
              }
            });
        }
    });
 });
 router.route('/forgotpassword').post((req,res)=>{
     if(req.isAuthenticated()){
        Instructor.findOne({ email: req.body.email })
        .then((instructor) => {
            instructor.setPassword(req.body.password,(err, instructor) => {
                if (err) return next(err);
                instructor.save();
                res.status(200).json({ message: 'Successful Password Reset' });
            });
        })
     }
     else{
         res.redirect('/login');
     }
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
 module.exports=router;