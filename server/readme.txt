1.Install the Dependencies 
-npm install

2.Start the server
-node server.js

3.project url 
-http://localhost:8080/address 

4.NOTE : The input text box will provide you with auto suggestions dropdown (used google auto suggestion) which will send the coordinates of the provided address to the server sides.

5.API will return the boundary coordinates and outlet location which is then ploted on google map.

6.Provided kml file is converted to json format and saved it in data.json file in project folder.

7.It's a POST method which accept latitude and longitude as a parameter in json format

	Sample parameters  : {"lat":48.194908,"lng":16.343130}
	sample response    :
			{
			"formattedAddress": "Schönbrunner Str. 41, 1050 Wien, Austria",
    			"latitude": 48.192691,
    			"longitude": 16.357458,
    			"outlet": "au_vienna_schoenbrunnerstr"
			}

Additional Information :

Links referred :

- http://kmlviewer.nsspot.net/ (for loading and viewing the .kml file)

- https://mygeodata.cloud/converter/kml-to-json (For converting .kml file into JSON)

- https://www.npmjs.com/package/point-in-polygon (NPM Package for determining if a point lies within the specified polygon)

- https://www.npmjs.com/package/point-in-geopolygon (NPM Package for determining if a point lies within the specified GeoJSON polygon considering the .kml file contains a GeoJSON)

- https://www.latlong.net/convert-address-to-lat-long.html (Site to cross verify if after conversion (to lat, long values) the addresses provided in the test sheet fall within the polygon values provided in the .kml file)
