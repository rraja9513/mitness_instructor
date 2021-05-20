const router=require('express').Router();
let Liveclass=require('../models/liveclass.model');
router.route('/').get((req,res)=>{
    Liveclass.find()
    .then(liveclasses=>res.json(liveclasses))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/search').post((req, res) => {
  Liveclass.find({classname : req.body.classname})
    .then(liveclasses => res.json(liveclasses))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
        const classname = req.body.classname;
        const sdateandtime=req.body.sdateandtime;
        const description = req.body.description;
        const image = req.body.image;
        const classtype=req.body.classtype;
        const approval=req.body.approval;
        const access=req.body.access;
        const price=req.body.price;
        const category=req.body.category;
        const instructor={
            name:req.body.name,
            img:req.body.img,
        };
        const duration =req.body.duration;
        const caloriesburnt=req.body.caloriesburnt;
        const instructorprofile=req.body.instructorprofile;
        const snameandcount=req.body.snameandcount;
        const newLiveclass=new Liveclass({
          classname,
          sdateandtime,
          description,
          image,
          classtype,
          approval,
          access,
          price,
          category,
          instructor,
          duration,
          caloriesburnt,
          instructorprofile,
          snameandcount,
        })
        newLiveclass.save()
  .then(() => res.json('Liveclass added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    Liveclass.findById(req.params.id)
      .then(liveclass => {
        liveclass.classname = req.body.classname;
        liveclass.sdateandtime=req.body.sdateandtime;
        liveclass.description = req.body.description;
        liveclass.image = req.body.image;
        liveclass.classtype=req.body.classtype;
        liveclass.approval=req.body.approval;
        liveclass.access=req.body.access;
        liveclass.price=req.body.price;
        liveclass.category=req.body.category;
        liveclass.instructor={
            name:req.body.name,
            img:req.body.img,
        };
        liveclass.duration =req.body.duration;
        liveclass.caloriesburnt=req.body.caloriesburnt;
        liveclass.instructorprofile=req.body.instructorprofile;
        liveclass.snameandcount=req.body.snameandcount;
        liveclass.save()
          .then(() => res.json('Liveclass updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Program.findByIdAndDelete(req.params.id)
      .then(() => res.json('Liveclass deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  module.exports=router;