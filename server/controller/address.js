var inside = require('point-in-polygon')
var dataPoints = require('./../data.json');
// var geoMaps = require('./../library/googlemaps');

let address = {
	returnOutletIdentifier : function (req,res,next){	
		if(req.body.lat && typeof req.body.lat != 'number' && req.body.lat >= 0){
			return res.status(204).send({'is_success':false, 'message':'Wrong input'});		
		}
		if(req.body.lng && typeof req.body.lng != 'number' && req.body.lng >= 0){
			return res.status(204).send({'is_success':false, 'message':'Wrong input'});	
	
		}
		let latitude = req.body.lng,
				longitude = req.body.lat,
				area_code = 'NOT_FOUND';
				let polygonData = null;
				let areaCoordinate = [];
				for (var i = 0; i < dataPoints.length; i++) {
					if(inside([latitude, longitude], dataPoints[i].polygon_coordinates)){
						area_code = dataPoints[i].area_code;
						areaCoordinate = dataPoints[i].polygon_coordinates;				
						break;
					}	
				}
				if(area_code == 'NOT_FOUND'){
					return res.status(400).send({'is_success':false, 'message':'No Outlet Found'});
				}				
				geoMaps.getLatlongFromAddress(area_code,function(err,response){					
					if(err){
						return res.status(400).send({'is_success':false, 'message':'No data found'});
					}else if(response && response.length == 0){
						return res.status(400).send({'is_success':false, 'message':'No data found'});
					}				
					return res.status(200).send({'is_success': true,
						'formattedAddress': response[0].formattedAddress ? response[0].formattedAddress : 'No Data found' ,
						'latitude':response[0].latitude ? response[0].latitude : 'No Data' ,
						'longitude':response[0].longitude ? response[0].longitude : 'No Data' ,
						'outlet':area_code,
						'area_coordinate':areaCoordinate ,
						'message':'Outlet found' });
				})
	}

}

module.exports = address;

