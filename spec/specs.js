describe('getLatLng', function() {
  it("return correct latitude and longitude", function() {
    var url = getGeocode("Portland", "Oregon", "US");
    var json = getJSON(url);
    expect(getLatLng(json)).to.eql({lat: 45.5230622, lng: -122.6764816});
  });
});
