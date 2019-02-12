var _baseURL = "https://api.openweathermap.org/data/2.5/";
var _APIKEY = "fff6ce2f865b03b789b7c1f537b6518b";

export function getWeatherByCityName(city) {
  let url = `${_baseURL}forecast?q=${city}&APPID=${_APIKEY}&units=metric`;
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(weather => {
      const { cod } = weather;
      if (cod === "200") {
        return weather;
      } else {
        return Promise.reject(cod);
      }
    });
}

export function getCurrentWeatherByCityName(city) {
  let url = `${_baseURL}weather?q=${city}&APPID=${_APIKEY}&units=metric`;
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(weather => {
      return weather;
    });
}
