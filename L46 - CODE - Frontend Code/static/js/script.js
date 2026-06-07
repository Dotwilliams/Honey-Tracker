var userLocation = document.getElementById('user-location');
function getDistance() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        userLocation.innerText = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var longitude1 = position.coords.longitude;
    var latitude1 = position.coords.latitude;
    var currCoordinate = lineCoordinates[lineCoordinates.length - 1];
    var longitude2 = currCoordinate[0];
    var latitude2 = currCoordinate[1];
    var distanceValue = calculateDistance(latitude1, longitude1, latitude2, longitude2);
    userLocation.innerText = distanceValue + " far from you.";
}
function resetAllData() {
    var confirmReload = confirm("Warning! All previous data will be deleted.\nAre you sure you want to Reset?");
    if (confirmReload) {
        location.reload();
    }
}
function getDirectionName(direction) {
    const directions = {
        "N": "North", "S": "South", "E": "East", "W": "West",
        "NE": "North-East", "SE": "South-East",
        "SW": "South-West", "NW": "North-West",
        "NNE": "North of North-East", "ENE": "East of North-East",
        "ESE": "East of South-East", "SSE": "South of South-East",
        "SSW": "South of South-West", "WSW": "West of South-West",
        "WNW": "West of North-West", "NNW": "North of North-West"
    };
    return directions[direction] ? directions[direction] : "INVALID Direction";
}
let currentColorIndex = 0;
function changeTheme() {
    var colors = ['blueviolet', 'bisque', 'cyan', 'salmon', 'gold', 'deepskyblue', 'chocolate'];
    const mainElement = document.querySelector('.main');
    const customElement = document.querySelector('.custom-style');
    // Get the next color from the colors array
    const nextColor = colors[currentColorIndex];

    // Update the border color of the main element with the next color
    mainElement.style.borderColor = nextColor;
    customElement.style.backgroundColor = nextColor;

    // Increment the current color index, and if it exceeds the array length, reset it to 0
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}
function scrollToTop() {
    const mainElement = document.querySelector('.main');
    mainElement.scrollTop = 0;
}
function scrollToBottom() {
    const mainElement = document.querySelector('.main');
    mainElement.scrollTop = mainElement.scrollHeight;
}

mapboxgl.accessToken = 'pk.eyJ1IjoicmF2aTIwMjMiLCJhIjoiY2xqd241azUxMGNmdjNkbnY5dXA3YW43MyJ9.XyhT8ZFgHLBDwB5XmFEvRg';
var INITIAL_CENTER = [101.6386, 3.1073];
var mapStyle = 'mapbox://styles/mapbox/outdoors-v12'
const map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    zoom: 18,
    center: INITIAL_CENTER
});

// =====================================
// Adding a home marker for Pataling Jaya
// Add a home marker for Petaling Jaya
var homeCoordinates = [101.6386, 3.1073];

// Create a custom home marker

var homeMarker = new mapboxgl.Marker({ color: '#ff0000' })  // Red marker for home
    .setLngLat(homeCoordinates)
    .setPopup(new mapboxgl.Popup().setHTML('<h6>My Project Location</h6><p>Jln SS 6/7, Ss 6, 47301 Petaling Jaya</p>'))
    .addTo(map);


// --------------------------------------------

// Get user's current location and center map there
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLongitude = position.coords.longitude;
        var userLatitude = position.coords.latitude;

        map.setCenter([userLongitude, userLatitude]);
        map.setZoom(15);

        // Add a marker for user's location
        new mapboxgl.Marker({ color: '#4285F4' })
            .setLngLat([userLongitude, userLatitude])
            .setPopup(new mapboxgl.Popup().setHTML('<h6>Your Location</h6>'))
            .addTo(map);
    });
}

//==========================================   

const firebaseConfig = {
    apiKey: "AIzaSyCXwDAb9riJXsoOF9K3pKHMA-BLvsY1G20",
    authDomain: "gps-data-test-a66f1.firebaseapp.com",
    databaseURL: "https://gps-data-test-a66f1-default-rtdb.firebaseio.com/",
    projectId: "gps-data-test-a66f1",
    storageBucket: "gps-data-test-a66f1.appspot.com",
    messagingSenderId: "572805524505",
    appId: "1:572805524505:web:310c70f043e7d46adfce88"
};
firebase.initializeApp(firebaseConfig);
var ref = firebase.database().ref();
var lineCoordinates = [];
map.on('load', function () {
    map.addSource('line', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': lineCoordinates
            }
        }
    });
    map.addLayer({
        'id': 'line',
        'type': 'line',
        'source': 'line',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#00ff00',
            'line-width': 3
        }
    });
    var previousMarker = null;
    var isFirstCoordinate = true;
    var latitude1, longitude1, latitude2, longitude2;
    var lastLatitude, lastLongitude;
    var lngLabel = document.getElementById('lng-label');
    var latLabel = document.getElementById('lat-label');
    var addressLabel = document.getElementById('address-label');
    var distanceLabel = document.getElementById('distance-label');
    var speedLabel = document.getElementById('speed-label');
    var directionLabel = document.getElementById('direction-label');
    var altitudeLabel = document.getElementById('altitude-label');
    var degreeLabel = document.getElementById('degree-label');
    var hdopLabel = document.getElementById('hdop-label');
    var satellitesLabel = document.getElementById('satellites-label');
    var dateLabel = document.getElementById('date-label');
    var time1Label = document.getElementById('time1-label');
    var time2Label = document.getElementById('time2-label');
    ref.on("value", function (snapshot) {
        var data = snapshot.val()['GPS-Data'];
        var lat = data.Latitude;
        var lng = data.Longitude;
        var altitude = data.Altitude;
        var date = data.Date;
        var degree = data.Degree;
        var direction = data.Direction;
        var hdop = data.HDoP;
        var speed = data.Speed;
        var time1 = data.UTC_Time;
        var time2 = data.Local_Time;
        var satellites = data.Satellites;
        speedLabel.innerText = speed === "" ? "Not Available" : `${speed} km/h`;
        directionLabel.innerText = direction === "" ? "Not Available" : `Moving towards ${getDirectionName(direction)}`;
        altitudeLabel.innerText = altitude === "" ? "Not Available" : `${altitude} meters`;
        degreeLabel.innerText = degree === "" ? "Not Available" : degree;
        hdopLabel.innerText = hdop === "" ? "Not Available" : hdop;
        satellitesLabel.innerText = satellites === "" ? "Not Available" : satellites;
        dateLabel.innerText = date === "" ? "Not Available" : date;
        time1Label.innerText = time1 === "" ? "Not Available" : time1;
        time2Label.innerText = time2 === "" ? "Not Available" : time2;
        lngLabel.innerText = lng === "" ? "Not Available" : lng;
        latLabel.innerText = lat === "" ? "Not Available" : lat;
        if (lineCoordinates.length > 0) {
            lastLongitude = lineCoordinates[lineCoordinates.length - 1][0];
            lastLatitude = lineCoordinates[lineCoordinates.length - 1][1];
        }
        lineCoordinates.push([lng, lat]);
        map.getSource('line').setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': lineCoordinates
            }
        });
        var newDivElement = document.createElement('div');
        newDivElement.className = 'start-point';
        var firstMarker = new mapboxgl.Marker(newDivElement);
        if (isFirstCoordinate) {
            firstMarker.setLngLat([lng, lat]);
            firstMarker.addTo(map);
            isFirstCoordinate = false;
            longitude1 = lng;
            latitude1 = lat;
            lastLongitude = lng;
            lastLatitude = lat;
        }
        var marker = new mapboxgl.Marker();
        if (previousMarker) {
            previousMarker.remove();
        }
        marker.setLngLat([lng, lat]);
        marker.addTo(map);
        map.setCenter([lng, lat]);
        previousMarker = marker;
        const updatedGeocodeAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
        fetch(updatedGeocodeAPI)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const address = data.features[0].place_name;
                    addressLabel.innerText = address;
                } else {
                    addressLabel.innerText = "No address found.";
                }
            })
            .catch(error => {
                console.error('Error fetching address:', error);
                addressLabel.innerText = "Error fetching address.";
            });
        longitude2 = lng;
        latitude2 = lat;
        var distanceValue = calculateDistance(latitude1, longitude1, latitude2, longitude2);
        distanceLabel.innerText = distanceValue;
    });
});
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    if (distance < 1) {
        return (distance * 1000).toFixed(2) + ' m';
    } else {
        return distance.toFixed(2) + ' km';
    }
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}