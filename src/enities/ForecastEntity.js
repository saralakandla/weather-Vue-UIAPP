class ForecastEntity {
  constructor(
    city,
    temperature,
    windSpeed,
    humidity,
    day,
    daydesc,
    weatherIconDesc,
    iconId
  ) {
    this.city = city;
    this.temperature = temperature + "ºC";
    this.windSpeed = windSpeed + "m/s";
    this.humidity = humidity + "%";
    this.day = day;
    this.daydesc = daydesc;
    this.iconId = iconId;
    this.weatherIconDesc = weatherIconDesc;
    this.class = "owf owf-" + iconId + "-d owf-3x";
  }
}
export default ForecastEntity;
