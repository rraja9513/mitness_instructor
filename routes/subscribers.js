const router=require('express').Router();
let Subscriber=require('../models/subscriber.model');
router.route('/').post((req,res)=>{
    Program.find()
    .then(programs=>res.json(programs))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/subscribe/:id').post((req,res)=>{
    if(req.isAuthenticated()){
    const programid = req.params.id;
    const userid=req.user._id;
    const newSubscriber=new Subscriber({
       programid,
       userid
    })
    newSubscriber.save()
  .then(() => res.json('Subscriber added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}
else{
    res.redirect('/login');
}
});
module.exports=router;
