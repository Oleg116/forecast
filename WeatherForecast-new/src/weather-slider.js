function Slider() {
    this.step = 0;
    this.widthSliderItem = 34;
}

Slider.prototype.moveSlider = function(counter, clickedButton, unclickedButton) {
    var MAX_LEFT_POSITION_OF_WRAP_SLIDER = 0;
    var MAX_RIGHT_POSITION_OF_WRAP_SLIDER = -68;
    this.step = this.step + counter;
    this.sliderWarp.style.transform = 'translate(' + this.step  + '%)';
    unclickedButton.style.display = 'flex';
    if (this.step === MAX_RIGHT_POSITION_OF_WRAP_SLIDER || this.step === MAX_LEFT_POSITION_OF_WRAP_SLIDER) {
        clickedButton.style.display = 'none';
    }
}

Slider.prototype.initializeEventListeners = function() {
    
    this.sliderButtonLeft = document.getElementsByClassName('left-button')[0];
    this.sliderButtonRight = document.getElementsByClassName('right-button')[0];
    this.sliderWarp = document.getElementsByClassName('slider-wrap')[0];

    this.sliderButtonLeft.style.display = 'none';
    this.sliderButtonRight.addEventListener('click', function() {
        this.moveSlider(-this.widthSliderItem, this.sliderButtonRight, this.sliderButtonLeft);
    }.bind(this));
    
    this.sliderButtonLeft.addEventListener('click', function() {
        this.moveSlider(this.widthSliderItem, this.sliderButtonLeft, this.sliderButtonRight);
    }.bind(this));
}
