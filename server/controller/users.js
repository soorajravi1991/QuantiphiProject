// var db = require('../config/database.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userModel = require('../model/users.js');

let users = {

	signJWT : function(payload) {		
		var token = jwt.sign(payload, 'dota', {
	         		expiresIn:  5000 // expires in 24 hours
	        });
		return token;
	},


	login : function (req,res){		
	    userModel.login(req,function(response,err){		       	
	    	if(err){
	    		return res.status(400).send({ "data":  '', "is_success":  true});	
	    	}	      
	        const  result  =  bcrypt.compareSync(req.body.password, response[0].password);
	        if(!result){
	        	 return res.status(500).send({ "message":  'User not found'});
	        }  	        
	      	const  accessToken  =  users.signJWT({ id: response[0].id});
	        return res.status(200).send({ "access_token":  accessToken});
    	})
	},

	getUserData : function (req,res){
		userModel.getAllUser(req,function(response,err){
	    	if(err){
	    		return res.status(400).send({ "data":  '', "is_success":  true});	
	    	}	   	      
	        return res.status(200).send({ "user":  response,"is_success":  true});
    	})
			
	},

	signup : function (req, res) {		
		if(req.body.firstname  && !req.body.username ) {
			return res.status(400).json({status: 400, message: 'Invalid username.'});
		} else if(req.body && !req.body.password){
			return res.status(400).json({status: 400, message: 'Password not provided.'});
		}
	  	userModel.getUserDataByUsername(req,function(response,err){		  	   	
	    	if(err){
	    		return res.status(400).send({ "data":  '', "is_success":  true});	
	    	}
	    	if(response != ''){
	    		return res.status(400).json({status: 400, message: 'Username exists. Please select a different username.'});
	    	}
	    	var saltRounds = 10;
	    	var salt = bcrypt.genSaltSync(saltRounds);
			var hashedPassword = bcrypt.hashSync(req.body.password, salt);	
			userModel.createNewUser(req,hashedPassword,function(response,err){				
				if(response){					
					userModel.login(req,function(response,err){						
			 			if(response){
							const  accessToken  =  users.signJWT({ id: response[0].id});
			 			 	return res.status(200).send({ "user":  response, "access_token":  accessToken});
			 			}else{
			 				return res.status(400).json({status: 400, message: 'Couldn\'t. save new user'});	
			 			}
			 		})
				}else{
					return res.status(400).json({status: 400, message: 'Couldn\'t. save new user'});	
				}

			})
	    
    	})

	}

}

module.exports = users;