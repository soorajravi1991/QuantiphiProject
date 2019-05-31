var db = require('../config/database.js');
let categories = {

	soldCategories : function (req,res){			
    	db.query("select categories.name as category_name , COUNT(categories.id) as sold FROM order_products INNER JOIN products ON (order_products.product_id = products.id) INNER JOIN categories ON (categories.id = products.category_id)  GROUP BY categories.id;", function(categories,error) {    		
		        if (error) {	        
		        	return error;
		        }
	        	return  res(categories);
    	})
	},
}

module.exports = categories;