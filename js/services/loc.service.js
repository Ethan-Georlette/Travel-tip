import { storageService } from "./storage.service.js";
// https://maps.googleapis.com/maps/api/geocode/json?latlng=32.047104,34.832384&key=AIzaSyCePfEK3bXc96ayT5UdPTba5hsEXq2xydE
// SEARCH:
// address=adress
//latlng=lat,lng
export const locService = {
    getLocs,
    setLocations,
    getSearchedLoc,
    deleteLocation
}

const KEY = 'locsDB'


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    if (!storageService.load(KEY)) {
        storageService.save(KEY, locs)
    }
    return new Promise((resolve, reject) => {
        if (!locs.length) reject();
        resolve(storageService.load(KEY));
    });
}

function setLocations(location) {
    var stringLoc = location.toJSON()
    getPosAdress(stringLoc.lat, stringLoc.lng)
        .then(res => {
            const locObj = {
                name: prompt('enter location title'),
                lat: stringLoc.lat,
                lng: stringLoc.lng,
                adress: res,
                cratedAt: Date.now()
            }
            locs.push(locObj)
            storageService.save(KEY, locs)
        })
}

function getSearchedLoc(str) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyCePfEK3bXc96ayT5UdPTba5hsEXq2xydE`)
        .then(res => res.json())
        .then(res => {
            return res.results[0].geometry.location
        })
        .catch(console.log)
}

function getPosAdress(lat, lng) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCePfEK3bXc96ayT5UdPTba5hsEXq2xydE`)
        .then(res => res.json())
        .then(res => {
            return res.results[0].formatted_address
        })
        .catch(console.log)
}
// get from search a position
//get from latlng an adress


//save to local storage

function deleteLocation(locIdx) {
    let idx = locs.findIndex(loc => loc.id === locIdx);
    locs.splice(idx, 1)
    storageService.save(KEY, locs)
}