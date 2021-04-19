import React from 'react'

const NavButtons = (props) => {
    return(
    <div className='buttons'>
        <p className = 'left button' onClick={props.onLeft}>{`<`}</p>
        <p className = 'right button' onClick={props.onRight}>{`>`}</p>
    </div>)
}

export default NavButtons