<template>
  <b-container fluid>
    <b-row>
      <div v-if="showCurrentLoader">
        <div class="d-flex justify-content-center mb-3">
          <b-spinner label="Loading..."></b-spinner>
        </div>
      </div>
      <div v-if="!showCurrentLoader">
        <div>
          <p v-if="cwaErrors.length">
            <b-alert
              show
              variant="danger"
              v-for="(item, index) in cwaErrors"
              :key="index"
            >Server returned error, {{ item }}</b-alert>
          </p>
        </div>

        <div v-if="!cwaErrors.length" class="card">
          <!-- Card content -->
          <b-card header-tag="header">
            <template v-slot:header>
              <h4
                class="card-title font-weight-bold"
                style="text-align:center"
              >{{ currentforecast.city }}</h4>
            </template>
            <div class="card-body pb-3">
              <p class="card-text">{{ currentforecast.daydesc }}</p>
              <p class="card-text">{{ currentforecast.weatherIconDesc }}</p>
              <p class="card-text">
                <i v-bind:class="currentforecast.class"></i>
              </p>
              <div class="flexpad">
                <p class="display-1 degree">{{ currentforecast.temperature }}</p>
              </div>
              <div class="d-flex justify-content-between mb-4">
                <p>
                  <b>Humidity -</b>
                  {{ currentforecast.humidity }}
                  <b>wind Speed -</b>
                  {{ currentforecast.windSpeed }}
                </p>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import WeatherService from "../services/WeatherService.js";

export default {
  name: "CurrentWeather",
  props: ["current"],
  data() {
    return {
      currentforecast: [],
      showCurrentLoader: true,
      cwaErrors: []
    };
  },
  methods: {
    setHistory: function(response) {
      var storagehistory = [];
      if (localStorage.getItem("weatherHistory") == null) {
        storagehistory.push(response);
      } else {
        storagehistory = JSON.parse(localStorage.getItem("weatherHistory"));
      }
      this.removeOldHistory(storagehistory, response.city);
      storagehistory.push(response);
      localStorage.setItem("weatherHistory", JSON.stringify(storagehistory));
      this.$store.commit("change", storagehistory);
      this.showCurrentLoader = false;
    },
    fetchCurrentData: function(inputVal, searchCategory) {
      this.cwaErrors = [];
      this.showCurrentLoader = true;
      var api = new WeatherService();
      api
        .getCurrentWeather(inputVal, searchCategory)
        .then(response => {
          this.currentforecast = response;
          this.setHistory(response);
        })
        .catch(e => {
          this.cwaErrors = [];
          if (typeof e.response !== "undefined") {
            if (
              typeof e.response.data !== "undefined" ||
              e.response.data !== null
            ) {
              this.cwaErrors.push(
                JSON.parse(e.response.data.error).message +
                  " for the given input"
              );
              this.showCurrentLoader = false;
            }
          } else {
            if (e.message === "Network Error") {
              this.cwaErrors.push(
                "Unable to connect to API, Please check if the API is running."
              );
              this.showCurrentLoader = false;
            }
          }
        });
    },
    removeOldHistory: function(listArray, inputVal) {
      for (var i = 0; i < listArray.length; i++) {
        if (
          listArray[i].city.toLowerCase().trim() ==
          inputVal.toLowerCase().trim()
        ) {
          listArray.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.current.$on("fetchCurrentData", this.fetchCurrentData);
  },
  created() {
    this.fetchCurrentData("Leipzig", "City");
  }
};
</script>
