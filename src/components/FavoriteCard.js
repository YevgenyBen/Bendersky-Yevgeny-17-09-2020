import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size:{
        height:'200px',
        minWidth:'300px',
        backgroundColor:'red',
        margin:'10px'
    },
}))

export default function FavoriteCard(){
    const classes = useStyles();
    return(
        <div className={classes.size}></div>
    )
}