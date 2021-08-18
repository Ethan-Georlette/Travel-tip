import { storageService } from "./storage.service.js";
// https://maps.googleapis.com/maps/api/geocode/json?[SEARCH]&key=AIzaSyCePfEK3bXc96ayT5UdPTba5hsEXq2xydE
// SEARCH:
// adress=adress
//latlng=lat,lng
export const locService = {
    getLocs,
    setLocations
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
        setTimeout(() => {
            resolve(storageService.load(KEY));
        }, 2000)
    });
}

function setLocations(location) {
    var stringLoc = location.toJSON()
    const locObj = {
        name: prompt('enter location title'),
        lat: stringLoc.lat,
        lng: stringLoc.lng,
        cratedAt: Date.now()
    }
    locs.push(locObj)
    storageService.save(KEY, locs)
}



//save to local storage