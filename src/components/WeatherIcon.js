import React from 'react'

function WeatherIcon({ iconNumber }) {
    return (
        <img src={`/icons/${iconNumber}.png`} alt='weather-icon'/>
    )
}

export default WeatherIcon
