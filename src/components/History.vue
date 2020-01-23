<template>
  <b-container fluid>
    <b-row>
      <template>
        <div>
          <b-table :items="$store.getters.forecastHistory" :fields="fields" head-variant="light">
            <template v-slot:cell(weatherIconDesc)="data">
              <!-- `data.value` is the value after formatted by the Formatter -->
              <span>{{ data.value }}</span>
              <br />
              <i v-bind:class="data.item.class"></i>
            </template>
          </b-table>
        </div>
      </template>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      fields: [
        {
          key: "city",
          label: "City"
        },
        {
          key: "daydesc",
          label: "Day"
        },
        {
          key: "temperature",
          label: "Temp"
        },
        {
          key: "windSpeed",
          label: "Wind"
        },
        {
          key: "humidity",
          label: "Humidity"
        }
      ]
    };
  }
};
</script>
