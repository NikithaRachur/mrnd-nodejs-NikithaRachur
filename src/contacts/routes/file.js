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
  var fs=require('fs');
  var id=objects.length-1;
  fs.writeFile('G:/project/data/'+id+'-contacts.json',JSON.stringify(req.body),function(err){
    if(err){
      console.log("error in file");
    }
    else
    {
      console.log("file is saved..!!");
    }
  });
  res.send(id+"");
});


router.put('/:id', function(req, res, next) {
  var id=req.params.id;
   var obj1=objects[+(id)];
   var obj2=req.body;
   var fs = require('fs');
   for(var i in obj2){
      obj1[i]=obj2[i];
    }
    objects[+(id)]=obj1;

    var obj3=JSON.parse(fs.readFileSync("../../data/"+id+"-contacts.json"));
    console.log(obj3);
    for(var i in obj2){
      obj3[i]=obj2[i];
    }
  	 fs.writeFile('G:/project/data/'+id+'-contacts.json',JSON.stringify(obj3),function(err){
      if(err){
        console.log("error in file");
      }
      else
      {
         console.log("file is saved..!!");
      }
  });
   res.send(obj1);
});

router.put('/msg/:id', function(req, res, next) {
   console.log(req.body);
   var id = req.params.id;
   //var obj1=objects[+(req.params.id)];
   //var obj2=req.body;
   //for(var i in obj2)
  	 //obj1[i].push(obj2[i]);
   //objects[+(req.params.id)]=obj1;
   objects[(parseInt(req.params.id))].message.push(req.body.message);
   var fs=require('fs');
   var obj3=JSON.parse(fs.readFileSync("../../data/"+id+"-contacts.json"));
   obj3.message.push(req.body.message);
   fs.writeFile('G:/project/data/'+id+'-contacts.json',JSON.stringify(obj3),function(err){
      if(err){
        console.log("error in file");
      }
      else
      {
         console.log("file is saved..!!");
      }
  });
   //objects[(parseInt(req.params.id))].no_msgs+=1;

   //res.send(objects[(parseInt(req.params.id))].no_msgs+"");
   res.send(objects[(parseInt(req.params.id))]);
});

router.get('/msg/:id', function(req, res, next) {
	res.send(objects[(parseInt(req.params.id))]);
});

module.exports = router;
