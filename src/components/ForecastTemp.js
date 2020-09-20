import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size:{
        height: '200px',
        width: '250px',
        fontSize: '60px'
    },
}))

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value))/2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function ForecastTemp({temp}) {
    const classes = useStyles();
    return (
        <div className={classes.size+' forecast-temp'}>{getAverageTemp(temp)}C</div>
    )
}

export default ForecastTemp
