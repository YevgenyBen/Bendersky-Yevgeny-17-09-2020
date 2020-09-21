import React from 'react'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import FavoriteButton from './FavoriteButton'
import ForecastCard from './ForecastCard'
import ForecastTemp from './ForecastTemp'
import ForecastDate from './ForecastDate'
import WeatherIcon from './WeatherIcon'
import Location from './Location'


const useStyles = makeStyles(() => ({
    size: {
        height: '100px',
        minWidth: '100px',
        margin: '10px'
    },
    tempText: {
        fontSize: '50px'
    }
}))


function MainCard({ fiveDayData, current, isFahrenheit }) {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favoritesReducer);
    return (
        <div className='wrapper'>
            <div className={classes.tempText + ' icon'}>
                {fiveDayData.DailyForecasts[0].Day.IconPhrase}
                <WeatherIcon iconNumber={fiveDayData.DailyForecasts[0].Day.Icon} />
            </div>
            {favorites.find(item =>
                item.location === current.location
            ) ? <FavoriteButton locationKey={current.locationKey} location={current.location} isFavorite={true} /> :
                <FavoriteButton locationKey={current.locationKey} location={current.location} isFavorite={false} />
            }
            <ForecastDate date={fiveDayData.DailyForecasts[0].EpochDate} />
            <ForecastTemp temp={fiveDayData.DailyForecasts[0].Temperature} isFahrenheit={isFahrenheit} />
            <Location location={current.location} />
            <div className='forecast-card-holder'>
                {fiveDayData.DailyForecasts.map((item, index) => {
                    return <ForecastCard key={index} temp={item.Temperature} date={item.EpochDate} iconNumber={item.Day.Icon} isFahrenheit={isFahrenheit} />
                }
                )}
            </div>
        </div>
    )
}

export default MainCard
