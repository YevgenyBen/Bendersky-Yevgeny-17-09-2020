import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Convert} from '../helpers/Convert'

const useStyles = makeStyles(() => ({
    size:{
        height: '200px',
        width: '250px',
        fontSize: '150px'
    },
}))

const getAverageTemp = (temp) => {
    let avg = (parseInt(temp.Maximum.Value) + parseInt(temp.Minimum.Value))/2
    return ((Math.round((avg + Number.EPSILON) * 100) / 100))
}

function ForecastTemp({temp,isFahrenheit}) {
    const classes = useStyles();
    return (
        <div className={classes.size+' forecast-temp'}>
            {isFahrenheit?Convert(getAverageTemp(temp))+'\xB0F'
            :getAverageTemp(temp)+'\xB0C'}
            </div>
    )
}

export default ForecastTemp
