import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch=onSearch;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch((err) => console.log('Error: cannot init map',err));
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
            const strHtml=locs.map((loc,idx)=>{
                return`<table>
                    <tr>
                        <td>${idx+1}</td>
                        <td>${loc.name}</td>
                        <td onClick="onGo({lat:'${loc.lat}',loc:'${loc.lng}'})">GO</td>
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
                mapService.panTo({lat:pos.coords.latitude,lng:pos.coords.longitude});
                mapService.addMarker({lat:pos.coords.latitude,lng:pos.coords.longitude});
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSearch(ev){
}
// search that go to searched location geo code API

 // copy link ex 10

 // add weather