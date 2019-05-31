var db = require('../config/database.js');
let users = {
	login : function (req,res){			
    	db.query("select id,username,password from users where username = '" + req.body.username + "';", function(user,error) {    		
	        if (error) {	        
	        	return res(error,null);
	        };
	        return  res(user);
    	})
	},
	getAllUser : function (req,res){			
    	db.query("select id,username,password from users;", function(user,error) {    		
	        if (error) {	        
	        	return res(error,null);
	        };
	        return  res(user);
    	})
	},

	getUserDataByUsername : function (req,res){			
    	db.query("select id,username,password from users where username = '"+req.body.username+"';", function(user,error) {    		
	        if (error) {	        
	        	return res(error,null);
	        };
	        return res(user);
    	})
	},
	createNewUser : function (req,hashedPassword,res){	
				
    	db.query("INSERT INTO users (role_id,fname, lname, username, password,created,updated) VALUES (1,'"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.username+"','"+hashedPassword+"',NOW(),NOW());", function(user,error) {    		
	       
	        if (error) {	        
	        	return res(error,null);
	        };
	        return  res(user);
    	})
	}

}

module.exports = users;