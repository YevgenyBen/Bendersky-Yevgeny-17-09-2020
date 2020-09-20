import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        // margin: '0px 10px'
    },
}))

const getDayOfTheWeek = (date) => {
    let currentDate = new Date(date * 1000)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[currentDate.getDay()]
}

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value))/2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function ForecastCard({ temp, date }) {
    const classes = useStyles();
    return (
        <Paper className={classes.size}>

                <div>
                    {window.location.pathname=='/'?getDayOfTheWeek(date):'null'}
                </div>
                <div>
                    {window.location.pathname=='/'?getAverageTemp(temp):'null'}
                </div>

        </Paper>
    )
}

export default ForecastCard
