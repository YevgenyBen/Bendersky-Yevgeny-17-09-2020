import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size:{
        height:'100px',
        minWidth:'100px',
        margin:'10px'
    },
}))


function WeatherIcon() {
    const classes = useStyles();
    return (
        <div className={classes.size +' icon'}>Icon</div>
    )
}

export default WeatherIcon
