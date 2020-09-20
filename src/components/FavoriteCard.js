import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import WeatherIcon from './WeatherIcon'
import axios from 'axios'
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import CurrentLocationActions from '../actions/CurrentLocationActions'
import { useHistory } from 'react-router-dom'
import { CelsiusToFahrenheit } from '../helpers/Convert'

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '200px',
        backgroundColor: 'white',
        margin: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const apiKey = process.env.REACT_APP_API_KEY;

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value)) / 2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function FavoriteCard({ location, locationKey,isFahrenheit }) {
    const [forecast, setForcast] = useState()
    const dispatch = useDispatch();
    let history = useHistory()

    useEffect(() => {
        const getLocationWeather = (locationKey) => {
            console.log(locationKey)
            try {
                axios.get(process.env.REACT_APP_GET_LOCATION_WEATHER + locationKey + `?apikey=${apiKey}&metric=true`).then(response => {
                    console.log("response in card", response.data)
                    setForcast(response.data)
                })

            } catch (err) {
                swal("error fetching forcast,might have expired tries")
            }
        };
        getLocationWeather(locationKey)
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
                    <div>
                        {location}
                    </div>
                    <div>
                        {forecast && isFahrenheit ? CelsiusToFahrenheit(getAverageTemp(forecast.DailyForecasts[0].Temperature)) + '\xB0F'
                            : getAverageTemp(forecast.DailyForecasts[0].Temperature) + '\xB0C'}

                    </div>
                    <div>
                        <WeatherIcon iconNumber={forecast && forecast.DailyForecasts[0].Day.Icon} />
                    </div>
                </Paper>}
        </>

    )
}

export default FavoriteCard
