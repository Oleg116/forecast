function WeatherForecast() {
    this.htmlUtils = new HtmlUtils();
    this.buildDOMForWidget();
    this.selectedCity = DEFAULT_CITY_NAME
    this.timeValue = DEFAULT_TIME;
    this.valuePoint = DEFAULT_TEMPERATURE_MEASUREMENT;
    this.readyForOutputArr = [];
}

WeatherForecast.prototype.buildDOMForWidget = function() {
    this.htmlUtils.createSlider();
    this.htmlUtils.createCitiesDropDown();
    this.htmlUtils.createHoursDropDown();
    this.htmlUtils.addTemperatureMeasurementsDropdown();
    this.htmlUtils.createButtonsForSlider();
    this.htmlUtils.initializeSlider()
}

WeatherForecast.prototype.getWeather = function() {
    var xmlHttp = new XMLHttpRequest();
    var method = 'GET';
    var key = '999c35358c92671dad4b8a0598cae0aa';
    var baseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
    var apiUrl = baseURL + 'q=' + this.selectedCity + '&APPID=' + key;
    xmlHttp.open(method, apiUrl, true);
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState !== 4) {
            return;
        }
        if (xmlHttp.status !== 200) {
            console.error(xmlHttp.status + '' + xmlHttp.statusText);
        }
        this.cityWeatherData = JSON.parse(xmlHttp.responseText);
        this.setDataToWeatherSlider(this.cityWeatherData);
    }.bind(this);
}

WeatherForecast.prototype.initEventListeners = function() {
    this.hourDropdown = document.getElementsByClassName('hour-dropdown')[0];
    this.citiesDropdown = document.getElementsByClassName('cities-dropdown')[0];
    this.unitDropdown = document.getElementsByClassName('unit-dropdown')[0];

    this.hourDropdown.addEventListener('change', function(event) {
        this.timeValue = event.target.value;
        this.setDataToWeatherSlider();
    }.bind(this));
    this.citiesDropdown.addEventListener('change', function(event) {
        this.selectedCity = event.target.value;
        this.getWeather();
    }.bind(this));
    this.unitDropdown.addEventListener('change', function(event) {
        this.valuePoint = event.target.value;
        this.setDataToWeatherSlider();
    }.bind(this));
}

WeatherForecast.prototype.setDataToWeatherSlider = function() {
    this.removeWeatherDataFromUI();
    var dataForRendering = this.cityWeatherData.list;
    if (this.timeValue !== DAILY_FORECAST_VALUE) {
        this.timeValue = Number(this.timeValue);
        dataForRendering = this.filterDataByHours(this.cityWeatherData, this.timeValue);
    }
    this.renderFilteredByDateArrays(dataForRendering);
}

WeatherForecast.prototype.filterDataByHours = function(arrShouldToFilterByHour, filterValue) {
    return this.filteredTimeArr = arrShouldToFilterByHour.list.filter(function(item) {
        return new Date(item.dt_txt).getHours() === filterValue;
    });
}

WeatherForecast.prototype.handleTemperatureUnits = function(temperatureInKelvin) {
    return (this.valuePoint === DEFAULT_TEMPERATURE_MEASUREMENT ?  this.convertToCelsius(temperatureInKelvin) :
      this.convertToFahrenheit(temperatureInKelvin));
}

WeatherForecast.prototype.convertToCelsius = function(temperatureInKelvin) {
    return Math.round(temperatureInKelvin - CELSIUS_ZERO) + 'C';
}

WeatherForecast.prototype.convertToFahrenheit = function(temperatureInKelvin) {
    return Math.round(((temperatureInKelvin - CELSIUS_ZERO) * 1.8) + 32) + 'F';
}

WeatherForecast.prototype.removeWeatherDataFromUI = function() {
    var dailyWeatherBlock = document.getElementsByClassName('content-holder');
    for(var i = 0; i < dailyWeatherBlock.length; i++) {
        dailyWeatherBlock[i].textContent = '';
    }
}

WeatherForecast.prototype.renderFilteredByDateArrays = function(arrShouldToFilter) {
    var day = new Date().getDate();
    var mounth = new Date().getMonth();
    var year = new Date().getYear();

    for(var i = 0; i < DAYS; i++, day++) {
        this.readyForOutputArr[i] = arrShouldToFilter.filter(function(item) {
            return new Date(item.dt * 1000).getDate() === new Date(year, mounth, day).getDate()
        });
    }
    this.renderWeatherDataForDays(this.readyForOutputArr);
}

WeatherForecast.prototype.renderWeatherDataForDays = function(filteredByOtherMethodsArray) {
    for(i = 0; i < filteredByOtherMethodsArray.length; i++) {
        this.renderWeatherDataForDailyHours(filteredByOtherMethodsArray, i);
    }
}

WeatherForecast.prototype.renderWeatherDataForDailyHours = function(readyForOutputInUIArray, i) {
    for(var j = 0; j < readyForOutputInUIArray[i].length; j++) {
        var readyForOutputInUIData = readyForOutputInUIArray[i][j];
        var dateFormat = new Date(readyForOutputInUIData.dt_txt);
        var dailyWeatherBlock = document.querySelector('.content-holder' + i + j);

        var image = document.createElement('img');
        image.classList.add('img');
        image.setAttribute('alt', readyForOutputInUIData.main);
        image.setAttribute('src', 'http://openweathermap.org/img/wn/' + 
          readyForOutputInUIData.weather[0].icon + '@2x.png');
        dailyWeatherBlock.appendChild(image);

        var date = document.createElement('p');
        date.classList.add('date');
        date.textContent = 'Date: ' + dateFormat.getDate() +
          ':0'+ parseInt(dateFormat.getMonth() + 1);
        dailyWeatherBlock.appendChild(date);

        var hour = document.createElement('p');
        hour.classList.add('hour');
        hour.textContent = 'Hour: ' + dateFormat.getHours() +
          ':0' + dateFormat.getMinutes();
        dailyWeatherBlock.appendChild(hour);

        var humidity = document.createElement('p');
        humidity.classList.add('humidity');
        humidity.textContent = 'Humidity: ' +
          readyForOutputInUIData.main.humidity + '%';
        dailyWeatherBlock.appendChild(humidity);

        var temperature = document.createElement('p');
        temperature.classList.add('temperature');
        temperature.textContent = 'Temperature: ' +
          this.handleTemperatureUnits(readyForOutputInUIData.main.temp);
        dailyWeatherBlock.appendChild(temperature);

         var wind = document.createElement('p');
         wind.classList.add('wind');
         wind.textContent = 'Wind: ' + readyForOutputInUIData.wind.speed + 
          ' M/S, ' + readyForOutputInUIData.wind.deg + ' Deg';
        dailyWeatherBlock.appendChild(wind)

        var pressure = document.createElement('p');
        pressure.classList.add('pressure');
        pressure.textContent = 'Pressure: ' +
          readyForOutputInUIData.main.pressure + ' hPa';
        dailyWeatherBlock.appendChild(pressure);
    }
}

var wf = new WeatherForecast();
wf.getWeather();
wf.initEventListeners();

