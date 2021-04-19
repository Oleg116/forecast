import React from 'react';
import TimeStamp from './timeStamp';


const Day = (prop) => {
    function converter (temp) {
        if (prop.unit === "C"){
           return `${Math.round(temp - 273.15)}C`
        }else {
            return `${Math.round(((temp - 273.15) * 1.8) + 32)}F`
        }
    }
    let content = []
    for(let i = 0; i < prop.data.length; i++){
       content.push(<TimeStamp 
        date = {`${new Date(prop.data[i].dt_txt).getDate()}.0${new Date(prop.data[i].dt_txt).getMonth()}`}
        hour = {`${new Date(prop.data[i].dt_txt).getHours()} : ${new Date(prop.data[i].dt_txt).getMinutes()}0`}
        temperature = {`${converter(prop.data[i].main.temp)}`}
        humidity = {`${prop.data[i].main.humidity}%`}
        wind = {`${prop.data[i].wind.speed}m, ${prop.data[i].wind.deg}Deg`}
        pressure = {`${prop.data[i].main.pressure}hPa`}
        />);
    }
    return <div className='specificDayContainer' style={prop.style}>{content}</div>
}

export default Day