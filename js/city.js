/**
 * JAVASCRIPT
 */

 var geocoder;
 var map;
 var panorama;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var berkeley = {lat: 37.869085, lng: -122.254775};
  var sv = new google.maps.StreetViewService();

  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

  // Set up the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: berkeley,
    zoom: 16,
    streetViewControl: false
  });

  // Set the initial Street View camera to the center of the map.
  sv.getPanorama({location: berkeley, radius: 50}, processSVData);

  // Look for a nearby Street View panorama when the map is clicked.
  // getPanoramaByLocation will return the nearest pano when the
  // given radius is 50 meters or less.
  map.addListener('click', function(event) {
    sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
  });
}

function processSVData(data, status) {
  if (status === google.maps.StreetViewStatus.OK) {
    var marker = new google.maps.Marker({
      position: data.location.latLng,
      map: map,
      title: data.location.description
    });

    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);

    marker.addListener('click', function() {
      var markerPanoID = data.location.pano;
      // Set the Pano to use the passed panoID.
      panorama.setPano(markerPanoID);
      panorama.setPov({
        heading: 270,
        pitch: 0
      });
      panorama.setVisible(true);
    });
  } else {
    console.error('Street View data not found for this location.');
  }
}



function codeAddress() {
  // Get address from form
  var address = $("input#new-location-name").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      map.setCenter(location);

      var formattedAddress = results[0].formatted_address;
      var placeId = results[0].place_id;

      var contentString = "<div id='content'><h4>" + formattedAddress + "</h4><img class='streetview' src='https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + formattedAddress + "&fov=120&heading=235&pitch=10&key=AIzaSyDyoP_3UjpK3YSJT8g6-ngD1WzFv1seqLY'></div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Add marker
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      // Add eventlistner to zoom 8x on click
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
       alert("Geocode was not successful for the following reason: " + status);
    }
  });
}


/**
 * JQUERY
 */

$(document).ready(function() {
  $("form#new-spot").submit(function(event) {
    event.preventDefault();

    // Grab input fields
    var inputtedCountryName = $("input#new-country-name").val();
    var inputtedLocationName = $("input#new-location-name").val();

    // Clear input fields after pinning marker on map
    $("input#new-country-name").val("");
    $("input#new-location-name").val("");
   });
 });
