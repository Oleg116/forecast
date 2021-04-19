import React from 'react';
const SelectBox = (props) => {
    return (
    <select onChange={props.onChange} className={props.className}>
        {props.options.map(item =>  <option key={item} value={item}>{item}</option>)}
    </select>);
}
export default SelectBox