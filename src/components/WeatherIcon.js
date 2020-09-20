import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({icon}) => ({
    size:{
        height:'100px',
        minWidth:'100px',
    },
}))


function WeatherIcon({iconNumber}) {
    const classes = useStyles();
    return (

            <img src={`/icons/${iconNumber}.png`} />

    )
}

export default WeatherIcon
