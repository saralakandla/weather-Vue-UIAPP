<template>
  <b-container fluid>
    <b-row>
      <template>
        <div v-if="showChildLoader">
          <div class="d-flex justify-content-center mb-3">
            <b-spinner label="Loading..."></b-spinner>
          </div>
        </div>
        <div v-if="!showChildLoader">
          <div>
            <p v-if="errors.length">
              <b-alert
                show
                variant="danger"
                v-for="(item, index) in errors"
                :key="index"
              >Server returned error, {{ item }}</b-alert>
            </p>
          </div>
          <div v-if="!errors.length" style="width:120%">
            <h4 class="card-title font-weight-bold" style="text-align:left">City: {{ citySelected }}</h4>
            <b-table :items="forecast" :fields="fields" head-variant="light">
              <template v-slot:cell(weatherIconDesc)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <span>{{ data.value }}</span>
                <br />
                <i v-bind:class="data.item.class"></i>
              </template>
            </b-table>
          </div>
        </div>
      </template>
    </b-row>
  </b-container>
</template>
<script>
import WeatherService from "../services/WeatherService.js";

export default {
  name: "WeatherForecast",

  data() {
    return {
      fields: [
        {
          key: "daydesc",
          label: "Day"
        },
        {
          key: "temperature",
          label: "Avg Temp"
        },
        {
          key: "windSpeed",
          label: "Wind"
        },
        {
          key: "humidity",
          label: "Humidity"
        },
        {
          key: "weatherIconDesc",
          label: "Weather"
        }
      ],
      citySelected: "",
      searchCategory: "",
      showChildLoader: true,
      forecast: [],
      errors: []
    };
  },
  methods: {
    fetchForecastData(inputVal, searchCategory) {
      this.errors = [];
      this.showChildLoader = true;
      var api = new WeatherService();
      api
        .getForecastWeather(inputVal, searchCategory)
        .then(response => {
          this.forecast = response;
          this.citySelected = response[0].city;
          this.showChildLoader = false;
        })
        .catch(e => {
          this.errors = [];
          if (typeof e.response !== "undefined") {
            if (
              typeof e.response.data !== "undefined" ||
              e.response.data !== null
            ) {
              this.errors.push(
                JSON.parse(e.response.data.error).message +
                  " for the given input "
              );
              this.showChildLoader = false;
            }
          } else {
            if (e.message === "Network Error") {
              this.errors.push(
                "Unable to connect to API, Please check if the API is running."
              );
              this.showChildLoader = false;
            }
          }
        });
    }
  }
};
</script>
