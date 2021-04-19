import React from 'react';

 const TimeStamp = (props) => {
    return (
    <div className='hourlyBox'>
        <p className='date'>Date: {props.date}</p>
        <p className='hour'>Hour: {props.hour}</p>
        <p className='temperature'>Temperature: {props.temperature}</p>
        <p className='humidity'>Humidity: {props.humidity}</p>
        <p className='wind'>Wind: {props.wind}</p>
        <p className='pressure'>Pressure: {props.pressure}</p>
    </div>);
}

export default TimeStamp