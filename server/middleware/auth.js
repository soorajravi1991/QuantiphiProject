
// var userModel = require('../model/users.js');
var jwt = require('jsonwebtoken');
let auth = {
   isAuthenticated : function (req, res, next) {
	   	if(!req.headers){
	   		res.status(401).json({status: 401,message : 'No Token Found'});
	   	}
	   	var authToker = req.headers.authorization.split(" ");   	
		var token = authToker[1];
		if(token) {
			jwt.verify(token, 'dota', function(err, decoded) {
				if (err) {
					return res.status(401).json({status: 401,message : 'Invalid Token...'});
				} else {
					console.log("Token : ", decoded);
					req.user = {id: decoded.id};					
					next();
				}
			});
		} else {
			return res.status(403).json({status: 403, message : 'No token provided.'});			
		}
    }
}

module.exports = auth;