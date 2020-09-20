import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({icon}) => ({
    size:{
        height:'100px',
        minWidth:'100px',
        margin:'10px'
    },
}))


function WeatherIcon({iconNumber}) {
    const classes = useStyles();
    return (
        <div className={classes.size +' icon'}>
            <img src={`/icons/${iconNumber}.png`} />
        </div>
    )
}

export default WeatherIcon
