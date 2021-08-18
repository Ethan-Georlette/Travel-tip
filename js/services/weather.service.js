export const weatherService = {
    getposWeather,
}


function getposWeather(pos) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${pos.lat}&lon=${pos.lng}&appid=8fdf365fa6f6da9cbe38bdf9d57be052`)
        .then(res => res.json())
        .then(res => {
            return {
                loc:`${res.name},${res.sys.country}`,
                title: res.weather[0].main,
                description: res.weather[0].description,
                icon: res.weather[0].icon,
                //weather[0]?
                temp: res.main.temp
            }
        })
        .catch(console.log)
}
