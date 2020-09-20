import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import WeatherIcon from './WeatherIcon'

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '100%',
        backgroundColor: 'white',
    },
}))

const getDayOfTheWeek = (date) => {
    let day = new Date(date * 1000).toLocaleDateString('en-us', { weekday: 'long' })
    return day
}

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value))/2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function ForecastCard({ temp, date,locationKey,location,iconNumber,isFavorite }) {
    
    const classes = useStyles();
    return (
        <Paper className={classes.size}>

                <div>
                    {window.location.pathname=='/'?getDayOfTheWeek(date):locationKey}
                </div>
                <div>
                    {window.location.pathname=='/'?getAverageTemp(temp):location}
                </div>
                <div>
                    <WeatherIcon iconNumber={iconNumber}/>
                </div>

        </Paper>
    )
}

export default ForecastCard
