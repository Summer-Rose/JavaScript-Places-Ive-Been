/**
 * JAVASCRIPT
 */

 /* Wrapper function*/
function makePin(city, region, country) {
  var url = getGecode(city, region, country);
  var json = getJSON(url);
  var myLatLng = getLatLong(json);
  addPinToMap(myLatLng);
}

function getGeocode(city, region, country) {
  return "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + region + "&components=country:" + country + "&key=AIzaSyAPLwTaRGBFDVbk2ANQJO8B4Jlc6h4aZNM";
}

function getJSON(url) {
  var json = $.getJSON(url);
  return json;
}

function getLatLng(json) {
  var myLat = json.responseJSON.results[0].geometry.location.lat;
  var myLng = json.responseJSON.results[0].geometry.location.lng;
  var myLatLng = {lat: myLat, lng: myLng};
  return myLatLng;
}

function addPinToMap(latLng) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: latLng
  });

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: 'Hello World!'
  });
}

/**
 * JQUERY
 */
$(document).ready(function() {
  $("form#places").submit(function(event) {
    var city = $("input#city").val();
    var region = $("input#region").val();
    var country = $("input#country").val();
    makePin(city, region, country);
  })
})
