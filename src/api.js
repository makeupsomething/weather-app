var _baseURL = 'https://api.openweathermap.org/data/2.5/';
var _APIKEY = 'fff6ce2f865b03b789b7c1f537b6518b';

export function getWeatherByCityName(city) {
    let url = `${_baseURL}forecast?q=${city}&APPID=${_APIKEY}`
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson));
    });
}