
var db = require('../config/database.js');
let orders = {
	generateWhereCondition : function (data) {
		let whereClause = "";
		let wherePrefix = " WHERE ";

		if(!data) {
			return whereClause;
		}

		if(data.hasOwnProperty('status') && data.status){
			whereClause += wherePrefix + " order_status = " + data.status ;
			wherePrefix = " AND ";
		}

		if(data.hasOwnProperty('from_date') &&  data.from_date){
			whereClause += wherePrefix + " orders.created >= '" +  data.from_date +"' ";
			wherePrefix = " AND ";
		}
		
		if(data.hasOwnProperty('to_date') &&  data.to_date){
			whereClause += wherePrefix + " orders.created <= '" +  data.to_date +"' ";
			wherePrefix = " AND ";
		}
		
		if(data.hasOwnProperty('name') &&  data.name){
			whereClause += wherePrefix + " sellers.fname LIKE '" + "%"+  data.name +"%"+"' ";
			wherePrefix = " AND ";
		}

		return whereClause;
	},

	getOrderStats : function (req, res) {		
		try {
			let whereClause = orders.generateWhereCondition(req.query);			
			let sql =`SELECT orders.seller_id, concat(fname,' ',lname) as seller_name, SUM(products.price) as revenue, count(DISTINCT orders.id) as total_order,ROUND(SUM(products.price)/count(orders.id),2) as average_order_revenue FROM orders INNER JOIN order_products ON (order_products.order_id = orders.id) INNER JOIN products ON (products.id = order_products.product_id) INNER JOIN sellers ON(sellers.id = orders.seller_id) ${whereClause} GROUP BY sellers.id;`;
			db.query(sql, function(revenue, error) { 			 		
			  	if (error) {	        
		        	return error;
		        }
		        return  res(revenue);
			})
		} catch (error) {			
			return res(error);
		}	
	}
}
module.exports = orders;