var _geocoder;
var _map;

function getQueryString() {
    var assoc = new Array();
    var queryString = unescape(location.search.substring(1));
    var keyValues = queryString.split('&');
    for (var i in keyValues) {
        var key = keyValues[i].split('=');
        assoc[key[0]] = key[1];
    }
    return assoc;
}

function initializeMap(events, startAtCurrentLocation){

	_geocoder = new google.maps.Geocoder();
	
	if(startAtCurrentLocation && navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
				function(position) {
	      	var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					setUpMap(initialLocation, events);
				});
	} else {
		var initialLocation = new google.maps.LatLng(34.0194543, -118.4911912);
		setUpMap(initialLocation, events);
	}			

}

function setUpMap(initialLocation, events){
	console.log(initialLocation);
	var mapOptions = {
	  zoom: 2,
	  center: initialLocation,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		_map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		markCoords(events);
}


function markCoords(events){
					
	for(var i in events){

		var event = events[i].event;
		console.log('map() event ' + i + ':'+ event.title + ' - ' + event.start_address);
		
	  getCoords(event, 
			function (results, status, name) {
	    	if (status == google.maps.GeocoderStatus.OK) {
						var latlng = results[0].geometry.location;

						var marker = new google.maps.Marker({
						      position: latlng, 
						      map: _map, 
						      title: name
						  });
					} else {
					  console.log("Geocoding failed: " + status);
					}
  		});
	}
}

function getCoords(event, callback){

	console.log('getCoords() address: ' + event.start_address);

	if (_geocoder) {

		_geocoder.geocode({ 'address': event.start_address }, 
			function(results, status){ 
				//console.log('getCoords() geocoder result:' + status);
				callback(results, status, event.title); 
			});

	} else {
		console.log('no geocoder');
  }
}