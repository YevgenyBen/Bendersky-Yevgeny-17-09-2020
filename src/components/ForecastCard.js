import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CelsiusToFahrenheit } from '../helpers/Convert'

import WeatherIcon from './WeatherIcon'

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'

    },
    day:{
        marginBottom:'25px',
        fontSize:'1.5rem'
    }
}))

const getDayOfTheWeek = (date) => {
    let day = new Date(date * 1000).toLocaleDateString('en-us', { weekday: 'long' })
    return day
}

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value)) / 2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function ForecastCard({ temp, date, iconNumber, isFahrenheit }) {

    const classes = useStyles();
    return (
        <Paper square className={classes.size}>

            <div className={classes.day}>
                {getDayOfTheWeek(date)}
            </div>
            <div className={classes.day}>
            <WeatherIcon iconNumber={iconNumber} />
               
            </div>
            <div>
               {isFahrenheit ? CelsiusToFahrenheit(getAverageTemp(temp)) + '\xB0F'
                    : getAverageTemp(temp) + '\xB0C'}
            </div>

        </Paper>
    )
}

export default ForecastCard
