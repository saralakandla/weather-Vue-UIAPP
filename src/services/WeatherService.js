import axios from "axios";
import moment from "moment";
import ForecastEntity from "../enities/ForecastEntity.js";

class WeatherService {
  getCurrentWeather(inputVal, searchCategory) {
    var isCitySelected = searchCategory == "City" ? true : false;
    var URL = process.env.VUE_APP_CURRENT_URL + inputVal + "/" + isCitySelected;
    return new Promise((resolve, reject) => {
      axios.defaults.crossDomain = true;
      axios
        .get(URL)
        .then(response => {
          var day = moment(response.data.date);
          var forecastObj = new ForecastEntity(
            response.data.city,
            response.data.temperature,
            response.data.windSpeed,
            response.data.humidity,
            day.date(),
            day.format("ddd,MM/DD"),
            response.data.weatherIconDesc,
            response.data.weatherIconId
          );
          resolve(forecastObj);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getForecastWeather(inputVal, searchCategory) {
    var isCitySelected = searchCategory == "City" ? true : false;
    var URL =
      process.env.VUE_APP_FORECAST_URL + inputVal + "/" + isCitySelected;
    return new Promise((resolve, reject) => {
      axios.defaults.crossDomain = true;
      axios
        .get(URL)
        .then(response => {
          var result = [];
          console.log(response);
          response.data.forEach(function(element) {
            var day = moment(element.date);
            var forecast = new ForecastEntity(
              element.city,
              element.temperature,
              element.windSpeed,
              element.humidity,
              day.date(),
              day.format("ddd,MM/DD"),
              element.weatherIconDesc,
              element.weatherIconId
            );
            result.push(forecast);
          });
          resolve(result.splice(0, 5));
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default WeatherService;
