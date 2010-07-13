var _geocoder;
var _map;
var _zoomLocal = 6;
var _zoomGlobal = 2;

var _mapViewOptionsDefault = { useSensor: false, initialLocation: { address: '', lat: 34.019454, lng: -118.491191 } , zoomLevel: _zoomGlobal };

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
function mapEvents(options){
	
	var id = getQueryString()['id'];
	id = id != null ? '/' + id : '';
	var url = '/events/index' + id + '.json';
	$.getJSON(url, null, 
		function(data) { 
			initializeMap(data, options); 
			});
}

function initializeMap(events, options){

	_geocoder = new google.maps.Geocoder();
	console.log(options);
	if (options.zoomLevel == null){
		options.zoomLevel = _zoomGlobal;
	}
	if(options.useSensor && navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
				function(position) {
					//console.log(position);
	      	var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					//console.log('My initialLocation: ' + initialLocation);
					setUpMap(initialLocation, events, _zoomLocal);
				});
	} else {
		console.log('address:' + options.initialLocation.address);
		if (options.initialLocation.address.length>0 && _geocoder) {
			//console.log(options);
			_geocoder.geocode({ 'address': options.initialLocation.address }, 
				function(results, status){ 
					if (results != null && results.length > 0){
						var latlng = results[0].geometry.location;
						setUpMap(latlng, events, options.zoomLevel);
					}
				});
			} else {
				var latlng = new google.maps.LatLng(options.initialLocation.lat,options.initialLocation.lat);
				setUpMap(latlng, events, options.zoomLevel);
				
			}

		//}
	}			

}

function setUpMap(initialLocation, events, zoomLevel){
	console.log(initialLocation);
	var mapOptions = {
	  zoom: zoomLevel,
	  center: initialLocation,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		_map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		markCoords(events);
}


function markCoords(events){
					
	for(var i in events){

		var event = events[i].event;
		//console.log('map() event ' + i + ':'+ event.title + ' - ' + event.start_address);
		
	  //getCoords(event, 
		//	function (results, status, name) {
	   // 	if (status == google.maps.GeocoderStatus.OK) {
						var latlng = new google.maps.LatLng(event.start_lat,event.start_lng);//results[0].geometry.location;

						var marker = new google.maps.Marker({
						      position: latlng, 
						      map: _map, 
						      title: event.title
						  });
		//			} else {
		//			  console.log("Geocoding failed: " + status);
		//			}
  	//	});
	}
}

function getCoords(event, callback){

	//console.log('getCoords() address: ' + event.start_address);

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