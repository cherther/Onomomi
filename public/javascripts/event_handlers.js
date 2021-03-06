$(document).ready(function(){

	$('[title]').tooltip({ effect: 'fade', opacity: 0.7, predelay: 800 });
	
	$('#map-options-form').submit(function(evt) {
		evt.preventDefault();
		mapOptionsFormSubmit();
	});
	
	$('#map-options-form').change(function() {
		mapOptionsFormSubmit();
	});
	
	$('#cw-map-option-location-select-text').click(function() {
		//console.log('text changed: ' + $('#cw-map-option-location-select-text').val());
		$('#cw-map-option-location-select').attr('checked', true);
	});

	$('#event_start_address').blur(function(){
		var mapId = 'event_address_canvas';
		var location = $(this).val();
		if (location.length > 0){
			$('#' + mapId).slideDown();
			showOnMap(location, mapId, 
				function(latlng){ 
					console.log(latlng);
					$('#event_start_lat').val(latlng.b);
					$('#event_start_lng').val(latlng.c);
					}
					);
		}
	});
	
	function mapOptionsFormSubmit(){
		//console.log($('.cw-map-option-location:checked').val());
		var location = $('.cw-map-option-location:checked').val();
		console.log('useSensor: ' + (location == 'local'));
		var mapOptions = _mapViewOptionsDefault;

		switch(location){
			case 'local':
				mapOptions.useSensor = true;
				mapOptions.zoomLevel = _currentZoomLevel != null ? _currentZoomLevel : ZOOM_LOCAL;
				
				break;
			case 'select':
				mapOptions.useSensor = false;
				mapOptions.initialLocation.address = $('#cw-map-option-location-select-text').val();
				//console.log(mapOptions.initialLocation);
				mapOptions.zoomLevel =  _currentZoomLevel != null ? _currentZoomLevel : ZOOM_LOCAL;
				break;
			default:
			mapOptions.useSensor = false;
			//mapOptions.initialLocation = 'Los Angeles, CA, USA';
			mapOptions.zoomLevel =  _currentZoomLevel != null ? _currentZoomLevel : ZOOM_GLOBAL;

		}
		_currentZoomLevel = mapOptions.zoomLevel;
		console.log('_currentZoomLevel: ' + _currentZoomLevel);
		if (mapOptions.useSensor || mapOptions.initialLocation.address.length > 0){
			mapEvents(mapOptions);
		}
	}
});
