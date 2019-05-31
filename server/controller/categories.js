

var categoryModel = require('../model/categories.js');

let categories = {



	// getProductsByCategory : function (req,res){		
	//     userModel.login(req,function(response,err){	    	
	//     	if(err){
	//     		res.status(400).send({ "date":  '', "is_success":  true});	
	//     	}	      
	//         const  result  =  bcrypt.compareSync(req.body.password, response[0].password);
	//         if(!result){
	//         	return  'Password not valid!';
	//         }  	        
	//       	const  accessToken  =  users.signJWT({ id: response[0].id});
	//         res.status(200).send({ "user":  response, "access_token":  accessToken});
 //    	})
	// },

	soldCategories : function (req,res){
		categoryModel.soldCategories(req,function(response,err){
	    	if(err){
	    		res.status(400).send({ "data":  '', "is_success":  true});	
	    	}	   	      
	        res.status(200).send({ "categories":  response,"is_success":  true});
    	})
			
	}

}

module.exports = categories;