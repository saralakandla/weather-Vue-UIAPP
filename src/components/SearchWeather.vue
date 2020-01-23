<template>
  <b-container fluid>
    <b-row>
      <b-input-group>
        <template v-slot:append>
          <b-button v-on:click="searchWeather">Search</b-button>
        </template>
        <b-form-input
          v-model="searchByValue"
          @keypress="isNumber($event)"
        ></b-form-input>

        <template v-slot:prepend>
          <b-dropdown :text="searchCategory" variant="success">
            <b-dropdown-item v-on:click="showSearchDiv('City')"
              >City</b-dropdown-item
            >
            <b-dropdown-item v-on:click="showSearchDiv('ZipCode')"
              >ZipCode</b-dropdown-item
            >
          </b-dropdown>
        </template>
      </b-input-group>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      searchByValue: "Leipzig",
      searchCategory: "City"
    };
  },
  methods: {
    showSearchDiv(val) {
      if (val === "City") {
        this.$data.searchCategory = "City";
        this.searchByValue = "Leipzig";
      } else if (val === "ZipCode") {
        this.$data.searchCategory = "ZipCode";
        this.searchByValue = "04109,DE";
      }
    },
    searchWeather: function() {
      this.$parent.inputerrors = [];
      if (this.$data.searchByValue === "") {
        alert("Please provide search value for city or zipcode");
        return false;
      } else {
        this.$emit(
          "search-forecast",
          this.$data.searchByValue,
          this.$data.searchCategory
        );
      }
    },
    isNumber: function(evt) {
      if (this.$data.searchCategory == "City") {
        evt = evt ? evt : window.event;
        var txt = String.fromCharCode(evt.which);
        if (!txt.match(/[A-Za-z+#.]/)) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    }
  }
};
</script>
