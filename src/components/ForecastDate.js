import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '250px',
        fontSize: '37px',
        display:'flex',
        flexDirection:'column'
    },
}))

const getDayOfTheWeek = (date) => {
    let day = new Date(date * 1000).toLocaleDateString('en-us', { weekday: 'long' })
    return day
}
const getDate=(date)=>{
    let dateUTC = new Date(date * 1000)
    return dateUTC.getDate()+'/'+dateUTC.getMonth()+'/'+dateUTC.getFullYear()

}

export default function ForecastDate({ date }) {
    const classes = useStyles();
    return (
        <div className={classes.size + ' forecast-date'}>
            <div >{getDayOfTheWeek(date)}</div>
            <div>{getDate(date)}</div>
        </div>
    )
}