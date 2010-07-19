function formatDate(date, format)
{
		date = Date.parse(date);
		console.log(date);
    if (!format)
      format="M/dd/yyyy";               
  
    return date.toString(format);
}

var _geocoder;
var _map;
var ZOOM_LOCAL = 8;
var ZOOM_GLOBAL = 2;
var _currentZoomLevel;

var _mapViewOptionsDefault = { useSensor: false, initialLocation: { address: '', lat: 34.019454, lng: -118.491191 } , zoomLevel: ZOOM_GLOBAL };

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
		options.zoomLevel = ZOOM_GLOBAL;
	}
	if(options.useSensor && navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
				function(position) {
					//console.log(position);
	      	var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					//console.log('My initialLocation: ' + initialLocation);
					setUpMap(initialLocation, events, ZOOM_LOCAL);
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
function showOnMap(location, mapId, nextAction){
	
		_geocoder = new google.maps.Geocoder();
	
		_currentZoomLevel = _currentZoomLevel != null ? _currentZoomLevel : ZOOM_LOCAL;
		
		_geocoder.geocode({ 'address': location }, 
				function(results, status){
					if (results != null && results.length > 0){
						var latlng = results[0].geometry.location;
						var mapOptions = {
						zoom: _currentZoomLevel,
						center: latlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						
						_map = new google.maps.Map(document.getElementById(mapId), mapOptions);
						var marker = new google.maps.Marker({
						      position: latlng, 
						      map: _map
						  });
						
						google.maps.event.addListener(_map, 'zoom_changed', function() {
						    _currentZoomLevel = _map.getZoom();
						});
						
						if (nextAction != null){
							
							nextAction(latlng);
						}
						}
				});
}

function setUpMap(initialLatLng, events, zoomLevel){
	console.log(initialLatLng);
	var mapOptions = {
	  zoom: zoomLevel,
	  center: initialLatLng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		_map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		google.maps.event.addListener(_map, 'zoom_changed', function() {
		    _currentZoomLevel = _map.getZoom();
		});
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
						      title: event.title + ' - ' + formatDate(event.event_date, 'dddd, M/dd/yyyy')
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


