var DEFAULT_CITY_NAME = "Lviv";
var CELSIUS_ZERO = 273.15;
var DAYS = 5;
var DEFAULT_TEMPERATURE_MEASUREMENT = "C";
var TEMPERATURE_MEASUREMENTS = ["C", "F"];
var COUNT_OF_DAILY_TIMELAPS = 8;
var CITIES_DATA = [
  {
    "id": 702550,
    "name": "Lviv",
    "country": "UA",
    "coord": {
      "lon": 24.023239,
      "lat": 49.838261
    }
  },
  {
    "id": 703448,
    "name": "Kyiv",
    "country": "UA",
    "coord": {
        "lon": 30.516666,
        "lat": 50.433334
    }
  },
  {
    "id": 2643743,
    "name": "London",
    "country": "GB",
    "coord": {
      "lon": -0.12574,
      "lat": 51.50853
    }
  },
  {
    "id": 5128638,
    "name": "New York",
    "country": "US",
    "coord": {
      "lon": -75.499901,
      "lat": 43.000351
    }
  }
];


var DAILY_FORECAST_VALUE = "Daily";
var DEFAULT_TIME = DAILY_FORECAST_VALUE;
var HOURS_DATA = [
  DAILY_FORECAST_VALUE,
  "00",
  "03",
  "06",
  "09",
  "12",
  "15",
  "18",
  "21"
];