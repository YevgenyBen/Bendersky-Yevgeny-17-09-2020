import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import WeatherIcon from './WeatherIcon'
import { useDispatch } from "react-redux";
import CurrentLocationActions from '../actions/CurrentLocationActions'
import { useHistory } from 'react-router-dom'
import { CelsiusToFahrenheit } from '../helpers/Convert'
import ApiAccess from '../api/ApiAccess'

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '200px',
        backgroundColor: 'white',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin:'10px'
    },
    section: {
        marginBottom: '25px',
        fontSize: '1.5rem'
    }
}))

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value)) / 2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function FavoriteCard({ location, locationKey, isFahrenheit }) {
    const [forecast, setForcast] = useState()
    const dispatch = useDispatch();
    let history = useHistory()

    useEffect(() => {
        ApiAccess.getLocationWeather(locationKey).then(response => {
            console.log("response in card", response)
            setForcast(response)
        })
    }, [locationKey])

    const handleClick = () => {
        dispatch(CurrentLocationActions['SET_LOCATION']({
            locationKey: locationKey,
            location: location
        }))
        history.push('/')
    }

    const classes = useStyles();
    return (
        <>
            {forecast &&
                <Paper
                    className={classes.size}
                    onClick={handleClick}>
                    <div className={classes.section}>
                        {location}
                    </div>
                    <div className={classes.section}>
                        <WeatherIcon iconNumber={forecast && forecast.DailyForecasts[0].Day.Icon} />
                    </div>
                    <div >
                        {
                            forecast
                                &&
                                isFahrenheit
                                ?
                                CelsiusToFahrenheit(getAverageTemp(forecast.DailyForecasts[0].Temperature)) + '\xB0F'
                                :
                                getAverageTemp(forecast.DailyForecasts[0].Temperature) + '\xB0C'
                        }
                    </div>

                </Paper>}
        </>

    )
}

export default FavoriteCard
