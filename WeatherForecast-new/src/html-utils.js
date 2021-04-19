function HtmlUtils() {
    this.slider = new Slider();
}

HtmlUtils.prototype.createSlider = function() {
    for(i = 0; i < DAYS; i++){
        var dayBox = document.createElement('div');
        dayBox.classList.add('day', 'day' + i);
        document.getElementsByClassName('slider-wrap')[0].appendChild(dayBox);
        this.createSliderButtons(i);
    }
}

HtmlUtils.prototype.createSliderButtons = function(i) {
    for(var j = 0; j < COUNT_OF_DAILY_TIMELAPS; j++) {
        this.contentHolder = document.createElement('div');
        this.contentHolder.classList.add('content-holder', 'content-holder' + i + j);
        document.getElementsByClassName('day')[i].appendChild(this.contentHolder);
    }
}

HtmlUtils.prototype.createCitiesDropDown = function() {
    var citySelect = document.createElement('select');
    citySelect.classList.add('cities-dropdown');
    document.getElementsByClassName('select-container')[0].appendChild(citySelect);

    for(var i = 0; i < CITIES_DATA.length; i++) {
        var cityOption = document.createElement('option');
        cityOption.setAttribute('value', CITIES_DATA[i]['name']);
        cityOption.textContent = CITIES_DATA[i]['name'];
        document.getElementsByClassName('cities-dropdown')[0].appendChild(cityOption);
    }
}

HtmlUtils.prototype.createHoursDropDown = function() {
    var hourSelect = document.createElement('select');
    hourSelect.classList.add('hour-dropdown');
    document.getElementsByClassName('select-container')[0].appendChild(hourSelect);

    var hourOption = document.createElement('option');
    for(var i = 0; i < HOURS_DATA.length; i++){
        var hourOption = document.createElement('option');
        hourOption.setAttribute('value', HOURS_DATA[i]);
        hourOption.textContent = HOURS_DATA[i];
        document.getElementsByClassName('hour-dropdown')[0].appendChild(hourOption);
    }
}

HtmlUtils.prototype.addTemperatureMeasurementsDropdown = function() {
    var convertSelect = document.createElement('select');
    convertSelect.classList.add('unit-dropdown');
    document.getElementsByClassName('select-container')[0].appendChild(convertSelect);

    for(var i = 0; i < TEMPERATURE_MEASUREMENTS.length; i++) {
        var converterOption = document.createElement('option');
        converterOption.setAttribute('value', TEMPERATURE_MEASUREMENTS[i]);
        converterOption.textContent = TEMPERATURE_MEASUREMENTS[i];
        document.getElementsByClassName('unit-dropdown')[0].appendChild(converterOption);
    }
}

HtmlUtils.prototype.createButtonsForSlider = function () {
    var buttonsContainer = document.getElementsByClassName('button-container')[0]
    var leftButton = document.createElement('span');
    leftButton.classList.add('button', 'left-button');
    leftButton.textContent = '<';
    buttonsContainer.appendChild(leftButton);

    var rightButton = document.createElement('span');
    rightButton.classList.add('button', 'right-button');
    rightButton.textContent = '>';
    buttonsContainer.appendChild(rightButton);
}
HtmlUtils.prototype.initializeSlider = function () {
    
    this.slider.initializeEventListeners();
}