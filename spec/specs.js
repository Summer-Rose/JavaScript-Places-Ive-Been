<<<<<<< HEAD
describe('getLatLng', function() {
  it("return correct latitude and longitude", function() {
    var url = getGeocode("Portland", "Oregon", "US");
    var json = getJSON(url);
    expect(getLatLng(json)).to.eql({lat: 45.5230622, lng: -122.6764816});
=======
describe('functionName', function() {
  it("describe behavior", function() {
    expect(functionName(parameter)).to.equal(result);
>>>>>>> b8f4555f9727adb7e50e4ba0c063aa3f0238e0e4
  });
});
