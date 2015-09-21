/**
 * JAVASCRIPT
 */

 var geocoder;
 var map;
 

 function initialize() {
   geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng(-34.397, 150.644);
   var mapOptions = {
     zoom: 3,
     center: latlng
   }
   map = new google.maps.Map(document.getElementById("map"), mapOptions);
 }

 function codeAddress() {
   // Get address from form
   var address = $("input#new-location-name").val();
   geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      map.setCenter(location);

      var formattedAddress = results[0].formatted_address;

      var contentString = "<div id='content'><h4>" + formattedAddress + "</h4><img class='streetview' src='https://maps.googleapis.com/maps/api/streetview?size=400x400&pano=" + formattedAddress + "&fov=120&heading=235&pitch=10&key=AIzaSyDyoP_3UjpK3YSJT8g6-ngD1WzFv1seqLY'></div>";

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
