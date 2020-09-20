import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size:{
        height: '200px',
        width: '250px',
        fontSize: '60px'
    },
}))

const getDayOfTheWeek = (date) => {
    let currentDate = new Date(date * 1000)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[currentDate.getDay()]
}

export default function ForecastDate({date}) {
    const classes = useStyles();
    return (
        <div className={classes.size+' forecast-date'}>{getDayOfTheWeek(date)}</div>
    )
}