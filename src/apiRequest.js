import React from 'react';
import dataObj from './data.js'
import Day from './day.js';
import SelectBox from './createSelects'
import NavButtons from './navButtons'
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cityName: 'Lviv',
        hourlyPosition: 'Daily',
        units : 'C',
        error: null,
        isLoaded: false,
        sliderPosition: 0,
        items: []
      }
    }

    componentDidMount() {
     this.getWeather()
    }

    componentDidUpdate() {
      if(this.state.cityName !== this.state.items.city.name) {
        this.getWeather()
      }
    }

    getWeather() {

      const key = '999c35358c92671dad4b8a0598cae0aa';
      const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
      const apiUrl = `${baseURL}q=${this.state.cityName}&APPID=${key}`;
        fetch(apiUrl)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                cityName: result.city.name,
                isLoaded: true,
                items: result,
              })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    filterListByDate(arrShouldToFilter) {
      const dayCounts = 5;
      let day = new Date().getDate();
      let mounth = new Date().getMonth();
      let year = new Date().getYear();
      const readyForOutputArr = [];
      for (let i = 0; i < dayCounts; i++, day++) {
        readyForOutputArr[i] = arrShouldToFilter.filter((item) => {
          return new Date(item.dt_txt).getDate() === new Date(year, mounth, day).getDate();
        });
      }
      return readyForOutputArr;
    }

    filteredByHours(list) {
      let filteredData = list;
      if(this.state.hourlyPosition !== 'Daily') {
      const filterPoint = Number(this.state.hourlyPosition);
      filteredData = list.filter((item) => {
          return new Date(item.dt_txt).getHours() === filterPoint;
        });
      }
          return this.filterListByDate(filteredData);
    }

    cityChanger = (event) => {
      this.setState({
         cityName : event.target.value
        })};

    timeValueChanger = (event) => {
      this.setState({
        hourlyPosition : event.target.value
      })};

    unitChanger = (event) => {
      this.setState({
        units : event.target.value
      })};

      sliderRight = () => {
        let counter = this.state.sliderPosition;
       this.setState({sliderPosition: counter -= 107})
      }

      sliderLeft = () => {
        let counter = this.state.sliderPosition;
       this.setState({sliderPosition: counter += 107})
      } 


    render() {
      const {isLoaded, items: {list}} = this.state;
      if(!isLoaded){
        return<p>Loading...</p>
      }else{
        const {TEMPERATURE_MEASUREMENTS, CITIES_DATA, HOURS_DATA} = dataObj;
        return (
          
          <div>
           <NavButtons onRight ={this.sliderRight} onLeft ={this.sliderLeft}/>
           <div className='selectHolder'>
              <SelectBox className = 'selectCity' onChange = {this.cityChanger} options = {CITIES_DATA}/>
              <SelectBox className = 'selectHour' onChange = {this.timeValueChanger} options = {HOURS_DATA}/>
              <SelectBox className = 'selectUnit' onChange = {this.unitChanger} options = {TEMPERATURE_MEASUREMENTS}/>
            </div>
          <div className='wrapper'>
          <div className='wrap'>
           {this.filteredByHours(list).map(item => <Day unit = {this.state.units} data ={item}
             style={{transform: `translateX(${this.state.sliderPosition}%)`}}/>)}
           </div>
        </div>
        
        </div>)
    }
  }
  }

export default MyComponent
