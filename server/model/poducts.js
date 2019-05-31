var db = require('../config/database.js');
let poducts = {
	soldProduct : function (req,res){	
		let sql =  `select order_products.product_id,products.name , COUNT(product_id) as sold from order_products INNER JOIN products ON (products.id = order_products.product_id) GROUP BY order_products.product_id;`		
    	db.query(sql, function(products,error) {    		
	        if (error) {	        
	        	return error;
	        }
        	return  res(products);
    	})
	}

}

module.exports = poducts;