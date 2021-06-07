const router=require('express').Router();
const multer=require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);  
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
let Liveclass=require('../models/liveclass.model');
router.route('/').post((req,res)=>{
    Liveclass.find()
    .then(liveclasses=>res.json(liveclasses))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/:id').get((req, res) => {
  Liveclass.findById(req.params.id)
    .then(liveclass => res.json(liveclass))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/search').post((req, res) => {
  Liveclass.find({classname : req.body.classname})
    .then(liveclasses => res.json(liveclasses))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add',upload.array('images',2),(req,res,next)=>{
        const classname = req.body.classname;
        const sdateandtime=req.body.sdateandtime;
        const description = req.body.description;
        const image = req.files[0].path;
        const classtype=req.body.classtype;
        const approval=req.body.approval;
        const access=req.body.access;
        const price=req.body.price;
        const category=req.body.category;
        const instructor={
            name:req.body.name,
            iimg:req.files[1].path
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
router.post('/update/:id',upload.array('images',2),(req,res,next)=>{
    Liveclass.findById(req.params.id)
      .then(liveclass => {
        liveclass.classname = req.body.classname;
        liveclass.sdateandtime=req.body.sdateandtime;
        liveclass.description = req.body.description;
        liveclass.image = req.files[0].path;
        liveclass.classtype=req.body.classtype;
        liveclass.approval=req.body.approval;
        liveclass.access=req.body.access;
        liveclass.price=req.body.price;
        liveclass.category=req.body.category;
        liveclass.instructor={
            name:req.body.name,
            iimg:req.files[1].path
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
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await Liveclass.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  })
  module.exports=router;