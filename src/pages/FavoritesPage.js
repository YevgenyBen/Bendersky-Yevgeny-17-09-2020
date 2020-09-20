import React from 'react'
import { useSelector } from "react-redux";

import ForecastCard from '../components/ForecastCard'
import {makeStyles} from '@material-ui/core/styles';

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
    const favorites = useSelector((state) => state.favoritesReducer);
    console.log('favorites: ',favorites)
    return (
        <div className={classes.container}>
            {favorites.map((item,index)=>
                <ForecastCard key={index} locationKey={item.key} location={item.location}/>
            )}
        </div>
    )
}

export default FavoritesPage
