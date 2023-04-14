var express = require('express');
var router = express.Router();
var taskcollection = require('./users');
const app =express();
/* GET home page. */
router.get('/', function(req, res, next) {
  taskcollection.find().
  then(function(docs){
  res.render('index',{docs});
  })
 });
router.post('/submit',(req, res) => {
  taskcollection.create({
    content: req.body.task
  })
  .then(() => {
    res.redirect("/");
  })
});
router.get('/update/:id', function(req,res){
  taskcollection.findOne({_id: req.params.id}) 
  .then(function(docs){ 
  res.render('update', {docs})
  
  
  })
  
  
  })
router.get('/update/:id',(req, res) => {
  const id = req.params.id;
  taskcollection.findByIdAndUpdate(id, {
    content: req.body.task
  })
      res.redirect("/");

  });
router.post('/update/:id',function(req,res){
    let updated = {
      content: req.body.task
     } 
    taskcollection.findOneAndUpdate({_id:req.params.id},{'$set': updated },{require:true})
    .then(function(updated){
    res.redirect('/')
    })
    })
    
router.get('/remove/:id',function(req,res){
taskcollection.findOneAndDelete({_id: req.params.id})
.then(function(){
res.redirect('/')
})
})
module.exports = router;
