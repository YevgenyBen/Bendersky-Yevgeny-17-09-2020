import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    size: {
        height: '200px',
        width: '350px',
        fontSize: '37px'
    },
}))
export default function Location({ location }) {
    const classes = useStyles();
    return (
        <div className={classes.size + ' location'}>{location}</div>
    )
}
