import { storageService } from "./storage.service";

export const locService = {
    getLocs
}

const KEY = 'locsDB'


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(storageService.load(KEY));
        }, 2000)
    });
}

function getLocations(location) {
    var stringLoc = JSON.stringify(location.toJSON(), null, 2)
    const locObj = {
        name: prompt('enter location title'),
        lat: stringLoc.lat,
        lng: stringLoc.lng,
        cratedAt: Date.now()
    }

    if (!storageService.load(KEY)) {
        storageService.save(KEY, locs)
    }
    else {
        locs.push(locObj)
        storageService.save(KEY, locs)
    }
}


//save to local storage