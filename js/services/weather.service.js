export const weatherService = {
    getposWeather,
}


function getposWeather(pos) {
    return fetch(`api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&appid=8fdf365fa6f6da9cbe38bdf9d57be052`)
        .then(res => res.json())
        .then(res => {
            return {
                title:res.weather[0].main,
                description:res.weather[0].description,
                //weather[0]?
                temp:(parseFloat(res.main.temp)-32)*0.5556
            }
        })
        .catch(console.log)
}
