<template>
  <div id="app">
    <div>
      <h2>Weather Data</h2>
      <div>
        <b-form inline class="my-2">
          <label class="mx-2" for="time-interval">Date From</label>
          <b-form-select
            @change="applyFiltersForWeatherData()"
            class="mx-2"
            id="time-interval"
            v-model="weatherDataAppliedFilters.timeFrom"
            :options="weatherDataFilters.timeFrom"
          ></b-form-select>
          <label class="mx-2" for="time-interval">Date To</label>
          <b-form-select
            @change="applyFiltersForWeatherData()"
            class="mx-2"
            id="time-interval"
            v-model="weatherDataAppliedFilters.timeTo"
            :options="weatherDataFilters.timeTo"
          ></b-form-select>
          <label class="mx-2" for="city">City</label>
          <b-form-select
            @change="applyFiltersForWeatherData()"
            class="mx-2"
            id="city"
            v-model="weatherDataAppliedFilters.city"
            :options="weatherDataFilters.city"
          >
          </b-form-select>
          <b-button v-on:click="refreshWeatherData"> Refresh </b-button>
        </b-form>
        <b-table
          bordered
          small
          striped
          sticky-header
          id="weather-data-table"
          :items="weatherData"
          :fields="['type', 'time', 'place', 'value', 'unit', 'precipitation_type', 'direction']"
        >
        </b-table>
      </div>
    </div>
    <hr />

    <div class id="weather-predictions">
      <h2>Weather Predicitions</h2>
      <div>
        <b-form inline class="my-2">
          <label class="mx-2" for="time-interval">Date From</label>
          <b-form-select
            @change="applyFiltersForPredictions()"
            class="mx-2"
            id="time-interval"
            v-model="weatherPredictionsAppliedFilters.timeFrom"
            :options="weatherPredictionsFilters.timeFrom"
          ></b-form-select>
          <label class="mx-2" for="time-interval">Date To</label>
          <b-form-select
            @change="applyFiltersForPredictions()"
            class="mx-2"
            id="time-interval"
            v-model="weatherPredictionsAppliedFilters.timeTo"
            :options="weatherPredictionsFilters.timeTo"
          ></b-form-select>
          <label class="mx-2" for="city">City</label>
          <b-form-select
            @change="applyFiltersForPredictions()"
            class="mx-2"
            id="city"
            v-model="weatherPredictionsAppliedFilters.city"
            :options="weatherPredictionsFilters.city"
          >
          </b-form-select>
          <b-button v-on:click="refreshPredictionsData">Refresh</b-button>
        </b-form>

        <b-table
          bordered
          small
          striped
          sticky-header
          id="predictions-data-table"
          :items="weatherPredictions"
          :fields="['type', 'time', 'place', 'from', 'to', 'unit', 'precipitation_types', 'directions']"
        >
        </b-table>
      </div>
    </div>
    <hr />
    <div class="container">
      <b-card no-body class="m-2">
        <b-card-header>
          <h2>Report Data</h2>
        </b-card-header>
        <b-card-body id="form">
          <b-card-text>
            <b-form inline class="my-2">
              <label for="type" class="mr-2">Type</label>
              <b-form-select
                id="type"
                class="mr-4"
                :options="form.types"
                v-model="form.type"
              ></b-form-select>
              <label for="date" class="mr-2">Date</label>
              <b-form-datepicker
                class="mr-4"
                id="date"
                v-model="form.date"
              ></b-form-datepicker>
              <label for="time" class="mr-1">Time</label>
              <b-form-timepicker
                class="mr-1"
                id="time"
                v-model="form.time"
                locale="en"
              ></b-form-timepicker>
            </b-form>
            <b-form inline class="my-2">
              <label for="place" class="mr-1">Place</label>
              <b-form-input
                class="mr-4"
                id="place"
                v-model="form.place"
              ></b-form-input>
              <label for="value" class="mr-1">Value</label>
              <b-form-input
                class="mr-4"
                id="value"
                v-model="form.value"
              ></b-form-input>
              <label for="unit" class="mr-1">Unit</label>
              <b-form-input
                class="mr-1"
                id="unit"
                v-model="form.unit"
              ></b-form-input>
            </b-form>
            <b-form inline class="my-2">
              <label
                for="wind-direction"
                class="mr-1"
                v-if="form.type == 'wind speed'"
                >Wind Direction</label
              >
              <b-form-select
                id="wind-direction"
                class="mr-1"
                :options="form.windDirections"
                v-model="form.windDirection"
                v-if="form.type == 'wind speed'"
              >
              </b-form-select>
              <label
                for="precipitation-type"
                class="mr-1"
                v-if="form.type == 'precipitation'"
                >Precipitation Type</label
              >
              <b-form-select
                id="precipitation-type"
                class="mr-1"
                :options="form.precipitationTypes"
                v-model="form.precipitationType"
                v-if="form.type == 'precipitation'"
              >
              </b-form-select>
            </b-form>
            <b-alert
              :show="dismissSuccess"
              variant="success"
              @dismissed="dismissSuccess = 0"
            >
              {{ successMessage }}
            </b-alert>
            <b-alert
              :show="dismissError"
              variant="warning"
              @dismissed="dismissError = 0"
            >
              {{ errorMessage }}
            </b-alert>
            <b-button v-on:click="reportData">Report Data</b-button>
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
    <hr />
  </div>
</template>

<script>
import WeatherDataClass from "./models/WeatherData";
import WeatherPredictionsClass from "./models/WeatherPrediction";
export default {
  name: "App",
  components: {},
  data() {
    return {
      initialWeatherData: [],
      weatherData: [],
      initialWeatherPredictions: [],
      weatherPredictions: [],
      weatherDataFilters: {city: [], timeFrom: [], timeTo: [],},
      weatherDataAppliedFilters: {city: null, timeFrom: null, timeTo: null,},
      weatherPredictionsFilters: { city: [], timeFrom: [], timeTo: [] },
      weatherPredictionsAppliedFilters: {city: null, timeFrom: null,timeTo: null,},
      form: {
        type: null,
        date: null,
        time: null,
        place: null,
        value: null,
        unit: null,
        precipitationType: null,
        windDirection: null,
        precipitationTypes: ["rain", "hail", "snow", "sleet"],
        types: ["temperature", "precipitation", "cloud coverage", "wind speed"],
        windDirections: ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest",],
      },
      errorMessage: null,
      successMessage: null,
      dismissSuccess: 0,
      dismissError: 0,
    };
  },

  methods: {
    reportData() {
      if (
        this.form.type &&
        this.form.date &&
        this.form.time &&
        this.form.place &&
        this.form.value &&
        this.form.unit
      ) {
        var reportedData = {
          value: parseInt(this.form.value),
          type: this.form.type,
          unit: this.form.unit,
          time: new Date(this.form.date + "T" + this.form.time + ".000Z"),
          place: this.form.place,
        };
        if (this.form.type == "precipitation") {
          if (this.form.precipitationType) {
            reportedData.precipitation_type = this.form.precipitationType;
          } else {
            this.showErrorMessage();
          }
        }
        if (this.form.type == "wind speed") {
          if (this.form.windDirection) {
            reportedData.direction = this.form.windDirection;
          } else {
            this.showErrorMessage();
          }
        }
        
        let newDataItem = new WeatherDataClass(reportedData);
        const request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/data", true);
        request.setRequestHeader("Content-type", "application/json");
        var tmp = this;
        request.onload = function () {
          if (request.status == 201) {
            tmp.showSuccessMessage();
            tmp.refreshWeatherData();
          }
        };
        request.send(JSON.stringify(newDataItem));
      } else {
        this.showErrorMessage();
      }
    },
    refreshWeatherData() {
      this.resetFilters();
      this.initialWeatherData = [];
      this.weatherData = [];
      const request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8080/data");
      request.send();
      request.onload = () => {
        var data = JSON.parse(request.responseText).map((e) => {
          return new WeatherDataClass(e);
        });
        this.initialWeatherData = data;
        this.weatherData = data;
        this.setFiltersForWeatherData(data);
      };
    },
    applyFiltersForWeatherData() {
      this.weatherData = this.initialWeatherData;
      if (this.weatherDataAppliedFilters.city) {
        this.weatherData = this.weatherData.filter(
          (e) => e.place == this.weatherDataAppliedFilters.city
        );
      }
      if (this.weatherDataAppliedFilters.timeFrom) {
        this.weatherData = this.weatherData.filter(
          (e) => e.time >= this.weatherDataAppliedFilters.timeFrom
        );
      }
      if (this.weatherDataAppliedFilters.timeTo) {
        this.weatherData = this.weatherData.filter(
          (e) => e.time <= this.weatherDataAppliedFilters.timeTo
        );
      }
    },
    resetFilters() {
      this.weatherDataAppliedFilters.city = null;
      this.weatherDataAppliedFilters.timeFrom = null;
      this.weatherDataAppliedFilters.timeTo = null;
    },
    setFiltersForWeatherData(dataElements) {
      var datetimes = [{ text: "", value: null }];
      dataElements.forEach((e) => {
        if (!datetimes.includes(e.time)) {
          datetimes.push(e.time);
        }
      });
      var city = [{ text: "", value: null }];
      dataElements.forEach((e) => {
        if (!city.includes(e.place)) {
          city.push(e.place);
        }
      });
      this.weatherDataFilters.city = city;
      this.weatherDataFilters.timeFrom = datetimes;
      this.weatherDataFilters.timeTo = datetimes;
    },
    refreshPredictionsData() {
      this.resetPredictionsFilters();
      this.initialWeatherPredictions = [];
      this.weatherPredictions = [];
      const request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8080/forecast");
      request.send();
      request.onload = () => {
        var data = JSON.parse(request.responseText).map((e) => {
          return new WeatherPredictionsClass(e);
        });
        this.initialWeatherPredictions = data;
        this.weatherPredictions = data;
        this.setWeatherPredictionsFilters(data);
      };
    },
    applyFiltersForPredictions() {
      this.weatherPredictions = this.initialWeatherPredictions;
      if (this.weatherPredictionsAppliedFilters.city) {
        this.weatherPredictions = this.weatherPredictions.filter(
          (e) => e.place == this.weatherPredictionsAppliedFilters.city
        );
      }
      if (this.weatherPredictionsAppliedFilters.timeFrom) {
        this.weatherPredictions = this.weatherPredictions.filter(
          (e) => e.time >= this.weatherPredictionsAppliedFilters.timeFrom
        );
      }
      if (this.weatherPredictionsAppliedFilters.timeTo) {
        this.weatherPredictions = this.weatherPredictions.filter(
          (e) => e.time <= this.weatherPredictionsAppliedFilters.timeTo
        );
      }
    },
    resetPredictionsFilters() {
      this.weatherPredictionsAppliedFilters.city = null;
      this.weatherPredictionsAppliedFilters.timeFrom = null;
      this.weatherPredictionsAppliedFilters.timeTo = null;
    },
    setWeatherPredictionsFilters(dataElements) {
      var datetimes = [{ text: "", value: null }];
      dataElements.forEach((e) => {
        if (!datetimes.includes(e.time)) {
          datetimes.push(e.time);
        }
      });
      var city = [{ text: "", value: null }];
      dataElements.forEach((e) => {
        if (!city.includes(e.place)) {
          city.push(e.place);
        }
      });
      this.weatherPredictionsFilters.city = city;
      this.weatherPredictionsFilters.timeFrom = datetimes;
      this.weatherPredictionsFilters.timeTo = datetimes;
    },
    showErrorMessage() {
      this.dismissError = 3;
      this.errorMessage = "Not all fields are filled!";
    },
    showSuccessMessage() {
      this.dismissSuccess = 3;
      this.successMessage = "New data item has been saved!";
    },
  },
    created() {
    this.refreshWeatherData();
    this.refreshPredictionsData();
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
</style>
