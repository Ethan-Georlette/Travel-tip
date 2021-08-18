import { storageService } from './storage.service.js'
import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMapPos,

}
var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat:parseFloat(lat),lng:parseFloat(lng) },
                zoom: 15
            })
            gMap.addListener("click", onMapClick)
            console.log('Map!', gMap);
        })
}

function addMarker(lat, lng) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.zoom = 15;
    gMap.panTo(laLatLng);
}

function onMapClick(ev) {
    console.log(ev.latLng);
    const latLng = ev.latLng
    locService.setLocations(latLng)
    //TODO save location 
    // {id, name, lat, lng, weather, createdAt, updatedAt}
    //+render table save to storage
}

function getMapPos(){
    return gMap.getCenter().toJSON();
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyC4C-BtvOg1KbRq95MtG3L6tcJV99ID22w';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

