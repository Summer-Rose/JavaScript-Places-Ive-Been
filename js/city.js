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
       map.setCenter(results[0].geometry.location);

       // Add marker
       var marker = new google.maps.Marker({
           map: map,
           position: results[0].geometry.location
       });

       // Add eventlistner to zoom 8x on click
       marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
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
