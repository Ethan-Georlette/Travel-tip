import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.onCopyUrl = onCopyUrl;

function onInit() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch((err) => console.log('Error: cannot init map', err));
    // weatherService.initWeather();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            const strHtml = locs.map((loc, idx) => {
                console.log(loc);
                return `<table>
                    <tr>
                        <td>${idx + 1}</td>
                        <td>${loc.name}</td>
                        <td onClick="onPanTo(${loc.lat},${loc.lng})">GO</td>
                        <td onclick="onDelete(${loc.id})">delete</td>
                    </tr>
                </table>`
            }).join('')
            document.querySelector('.locs').innerHTML = strHtml;
        })
    //render location table ITP on click go to location & delete
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            mapService.addMarker(pos.coords.latitude, pos.coords.longitud);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
    mapService.addMarker(lat, lng);
}

function onSearch(ev) {
    ev.preventDefault();
    const elInputSearch = document.querySelector('input[name=search]');
    locService.getSearchedLoc(elInputSearch.value)
        .then(res => {
            console.log(res);
            mapService.panTo(res.lat, res.lng);
            mapService.addMarker(res.lat, res.lng);
        })

}

function onCopyUrl() {
    let copyText = new URLSearchParams(window.location.search);
    const center = getPosition()
    copyText += `?lat=${center.lat}&lng=${center.lng}`
    document.execCommand('copy', false, copyText)
}

 // copy link ex 10

 // add weather