var express = require('express');
var router = express.Router();
var objects=new Array();
/* GET contacts */
router.get('/:id', function(req, res, next) {
	res.send(objects[+(req.params.id)]);
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  objects.push(req.body);
  res.send(objects.length-1+"");
});


router.put('/:id', function(req, res, next) {
   var obj1=objects[+(req.params.id)];
   var obj2=req.body;
   for(var i in obj2)
  	 obj1[i]=obj2[i];
   objects[+(req.params.id)]=obj1;
   res.send(obj1);
});

router.put('/msg/:id', function(req, res, next) {
   console.log(req.body);
   //var obj1=objects[+(req.params.id)];
   //var obj2=req.body;
   //for(var i in obj2)
  	 //obj1[i].push(obj2[i]);
   //objects[+(req.params.id)]=obj1;
   objects[(parseInt(req.params.id))].message.push(req.body.message);
   //objects[(parseInt(req.params.id))].no_msgs+=1;
   //res.send(objects[(parseInt(req.params.id))].no_msgs+"");
   res.sendStatus(200);
});

router.get('/msg/:id', function(req, res, next) {
	res.send(objects[(parseInt(req.params.id))]);
});

module.exports = router;
