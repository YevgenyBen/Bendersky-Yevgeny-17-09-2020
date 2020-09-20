import React from 'react'
import ForecastCard from '../components/ForecastCard'
import {makeStyles} from '@material-ui/core/styles';
//range import
import {range} from 'lodash'
const useStyles = makeStyles(() => ({
    container:{
        margin:'100px',
        display:'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'center'
    }
}))

function FavoritesPage() {
    const classes = useStyles();
    let array=range(7);
    console.log(array)
    return (
        <div className={classes.container}>
            {array.map((index)=>
                <ForecastCard key={index}/>
            )}
        </div>
    )
}

export default FavoritesPage
