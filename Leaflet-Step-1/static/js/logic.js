// Creating the map object
var myMap = L.map("map", {
    center: [56.13, -123.34],
    zoom: 4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// Create base url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get data with d3
d3.json(queryUrl).then(function(data) {
    
    // Access eathquake features in 'features' dictionary
    var earthquake = data.features

    // Create loop to obtain features for each earthquake instance
    for (var i = 0; i < earthquake.length; i++) {

    // Assign features for each earthquake
    var latitude = earthquake[i].geometry.coordinates[1];

    var longitude = earthquake[i].geometry.coordinates[0];

    var depth = earthquake[i].geometry.coordinates[2];

    var magnitude = earthquake[i].properties.mag;

    // Create color scheme for markers
    var markerColor;
        if (depth <=10) {
        markerColor = "#0cff00"
        } else if (depth <=30) {
            markerColor = "#86A500"
        } else if (depth <=50) {
            markerColor = "#ECEC02"
        } else if (depth <=70) {
            markerColor = "#FFAB10"
        } else if (depth <=90) {
            markerColor = "#FFAB10"
        } else {
            markerColor = "#ff0000"
        };

        // Create markers
        var marker = L.circleMarker([latitude, longitude], {
            radius: magnitude **2,
            fillColor: markerColor,
            color: "black",
            fillOpacity: 1,
            weight: 1
        });
        marker.addTo(myMap);

        //Format date and time
        datetime = d3.timeFormat("Date = %d-%b-%Y, Time = %H:%M");

        // Create labels for markers
        marker.bindPopup(`<strong>Place: </strong> ${earthquake[i].properties.place}<br><strong>Occured: </strong>${datetime(new Date(earthquake[i].properties.time))}<br><strong>Magnitude: </strong>${earthquake[i].properties.mag}`);
    }
});