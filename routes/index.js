var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/sample');
var users=db.get('users');
var stdata=db.get('stdata');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/login',function(req,res){
	var email=req.body.email;
	console.log(email);
	var pwd=req.body.pwd;
	console.log(pwd);
	users.findOne({"email":email,"pwd":pwd},function(err,docs)
	{
		if(!docs)
		{
			res.render('index');
			console.log("invalid login");
		}
		else if(docs){
			res.redirect('/home');
			console.log("valid login");	
		}
		else{
			console.log(err);
		}
	});
});
router.get('/home',function(req,res){
	stdata.find({}, function(err,docs){
      if(err){
      	console.log(err);
      }
      else{
	  res.render('home', {"data":docs});
	 
      }
	});
});
router.post('/hh',function(req,res){
	var data1={
		name:req.body.name,
		rollno:req.body.rollno,
		dob:req.body.dob,
		ph:req.body.ph,
		college:req.body.college
	}
    stdata.insert(data1,function(err,docs){
    	if(err){
    		console.log(err);
    	}
    	else{
         	console.log(docs);
         	res.redirect('/home');
         }
    });
    
});
router.post('/signup',function(req,res){
	var data={
		fn:req.body.fn,
		sn:req.body.sn,
		email:req.body.email,
		pwd:req.body.pwd
	}
    users.insert(data,function(err,docs){
	if(err){
		console.log(err);
	}
	else{
		console.log(docs);
	}
    });
    res.redirect('/');
});
router.post('/del',function(req,res){
	var roll=req.body.no;
	stdata.remove({"rollno":roll},function(err,docs){
		if(docs){
			console.log(docs);
			res.send(docs);
		}
		else{
		    console.log(err);
	    }
	});
});
router.post('/edit',function(req,res){
	var r=req.body.va;
	stdata.find({"rollno":r},function(err,docs){
	    res.send(docs);
	});
});
router.post('/update',function(req,res){
    var data={
		name:req.body.name,
		rollno:req.body.rollno,
		dob:req.body.dob,
		ph:req.body.ph,
		college:req.body.college
	}
    stdata.update({"rollno":req.body.rollno},{$set:data},function(err,docs){
    	console.log(docs);
    	
    });
    res.redirect('/home');

});
module.exports = router;
