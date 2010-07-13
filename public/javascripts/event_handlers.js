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

	function mapOptionsFormSubmit(){
		//console.log($('.cw-map-option-location:checked').val());
		var location = $('.cw-map-option-location:checked').val();
		console.log('useSensor: ' + (location == 'local'));
		var mapOptions = _mapViewOptionsDefault;

		switch(location){
			case 'local':
				mapOptions.useSensor = true;
				mapOptions.zoomLevel = _zoomLocal;
				break;
			case 'select':
				mapOptions.useSensor = false;
				mapOptions.initialLocation.address = $('#cw-map-option-location-select-text').val();
				//console.log(mapOptions.initialLocation);
				mapOptions.zoomLevel = _zoomLocal;
				break;
			default:
			mapOptions.useSensor = false;
			//mapOptions.initialLocation = 'Los Angeles, CA, USA';
			mapOptions.zoomLevel = _zoomGlobal;

		}
		if (mapOptions.useSensor || mapOptions.initialLocation.address.length > 0){
			mapEvents(mapOptions);
		}
	}
});
