<template>
  <b-container fluid style="padding-left:5%">
    <b-row>
      <h4 class="py-3">Weather App</h4>
    </b-row>
    <b-row>
      <b-card no-body >
        <search-weather v-on:search-forecast="searchWeather" />
      </b-card>
    </b-row>
    <!-- <b-row v-if="inputerrors.length">
      <p>
        <b>Please correct the following error(s):</b>
        <b-alert show variant="danger" v-for="(item, index) in inputerrors" :key="index">{{ item }}</b-alert>
      </p>
    </b-row>-->
    <b-row>
      <b-card no-body >
        <div>
          <b-tabs v-model="tabIndex" pills card vertical>
            <b-tab title="Current Weather" active>
              <current-weather :current="current" />
            </b-tab>
            <b-tab title="Five Days Forecast" v-on:click="loadFiveDaysForecast">
              <weather-forecast ref="form" />
            </b-tab>
            <b-tab title="History">
              <History />
            </b-tab>
          </b-tabs>
        </div>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";
import SearchWeather from "./SearchWeather";
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import History from "./History";
export default {
  name: "Layout",
  components: {
    SearchWeather,
    CurrentWeather,
    WeatherForecast,
    History
  },
  data() {
    return {
      searchByValue: "Leipzig",
      searchCategory: "City",
      tabIndex: 0,
      inputerrors: [],
      current: new Vue()
    };
  },
  methods: {
    searchWeather: function(inputVal, searchCategory) {
      this.tabIndex = 0;
      this.searchByValue = inputVal;
      this.searchCategory = searchCategory;
      this.current.$emit("fetchCurrentData", inputVal, searchCategory);
    },
    loadFiveDaysForecast: function() {
      this.$refs.form.fetchForecastData(
        this.searchByValue,
        this.searchCategory
      );
    }
  }
};
</script>
