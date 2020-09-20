import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '250px',
        fontSize: '60px'
    },
}))
export default function Location({ location }) {
    const classes = useStyles();
    return (
        <div className={classes.size + ' location'}>{location}</div>
    )
}
