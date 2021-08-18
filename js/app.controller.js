import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.onDelete = onDelete;
window.onCopyUrl = onCopyUrl;

function onInit() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    if (params.lat || params.lng) {
        console.log('here');
        var prm = mapService.initMap(params.lat, params.lng)
    } else {
        prm = mapService.initMap()
    }
    prm.then(() => {
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
                        <td>id: ${idx + 1}</td>
                        <td>Location name: ${loc.name}</td>
                        <td>'Adress: '${loc.adress}</td>
                        <td>'Location: ' ${loc.lat, loc.lng}</td>
                        <td onClick="onPanTo(${loc.lat},${loc.lng})">GO</td>
                        <td onclick="onDelete(${loc.id})">delete</td>
                    </tr>
                </table>`
            }).join('')
            document.querySelector('.locs').innerHTML = strHtml;
        })
        .catch(err => {
            document.querySelector('.locs').innerHTML = 'no locations!!'
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
            mapService.addMarker(pos.coords.latitude, pos.coords.longitude);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onDelete(locIdx) {
    locService.deleteLocation(locIdx)
    onGetLocs()
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

    var center = mapService.getMapPos().toJSON();
    const copyText = `https://ethan-georlette.github.io/Travel-tip/index.html?lat=${center.lat}&lng=${center.lng}`
    copyTextToClipboard(copyText);
}
// copy link ex 10
// add weather
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}