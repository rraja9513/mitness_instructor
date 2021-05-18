const router=require('express').Router();
let Program=require('../models/program.model');
router.route('/').get((req,res)=>{
    Program.find()
    .then(programs=>res.json(programs))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/add').post((req,res)=>{
    const classname = req.body.classname;
    const image = req.body.image;
    const description = req.body.description;
    const duration =req.body.duration;
    const chooseinstructor=req.body.chooseinstructor;
    const category=req.body.category;
    const access=req.body.access;
    const price=req.body.price;
    const exercise={
        exercisename:req.body.exercisename,
        video:req.body.video,
        category:[
            {
                categoryname:req.body.categoryname,
                image:req.body.image,
                caloriesburnt:req.body.caloriesburnt,
            }
        ]
    };
    const pmaterial=req.body.pmaterial;
    const status=req.body.status;
    const newProgram=new Program({
        classname,
        image,
        description,
        duration,
        chooseinstructor,
        category,
        access,
        price,
        exercise,
        pmaterial,
        status,
    })
    newProgram.save()
  .then(() => res.json('Program added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Program.findById(req.params.id)
      .then(program => {
        program.classname = req.body.classname;
        program.image = req.body.image;
        program.description = req.body.description;
        program.duration =req.body.duration;
        program.chooseinstructor=req.body.chooseinstructor;
        program.category=req.body.category;
        program.access=req.body.access;
        program.price=req.body.price;
        program.exercise={
            exercisename:req.body.exercisename,
            video:req.body.video,
            category:[
                {
                    categoryname:req.body.categoryname,
                    image:req.body.image,
                    caloriesburnt:req.body.caloriesburnt,
                }
            ]
        };
        program.pmaterial=req.body.pmaterial;
        program.status=req.body.status;
        program.save()
          .then(() => res.json('Program updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Program.findByIdAndDelete(req.params.id)
      .then(() => res.json('Program deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  module.exports=router;