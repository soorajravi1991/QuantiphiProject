
var orderModel = require('../model/orders.js');
let orders = {
	sellerRevenue : function (req,res){		
		orderModel.getOrderStats(req,function(response,err){			
	    	if(err){
	    		return res.status(400).send({ "data":  '', "is_success":  true});	
	    	}	   	      
	        return res.status(200).send({ "orders":  response,"is_success":  true});
    	})
			
	},
	getOrderProduct : function(req,res){		
		orderModel.getOrderProduct(req,function(response,err){
	    	if(err){
	    		return res.status(400).send({ "data":  '', "is_success":  true});	
	    	}	   	      
	        return res.status(200).send({ "orders":  response,"is_success":  true});
    	})	
	}
}

module.exports = orders;