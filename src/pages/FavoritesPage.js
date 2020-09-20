import React from 'react'
import { useSelector } from "react-redux";

import FavoriteCard from '../components/FavoriteCard'
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    container:{
        margin:'100px',
        display:'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'center',
        
    }
}))

function FavoritesPage() {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favoritesReducer);
    const isFahrenheit = useSelector((state) => state.tempReducer.Fahrenheit);
    console.log('favorites: ',favorites)
    return (
        <div className={classes.container}>
            {favorites.map((item,index)=>
                <FavoriteCard key={index} locationKey={item.locationKey} location={item.location} isFahrenheit={isFahrenheit}/>
            )}
        </div>
    )
}

export default FavoritesPage
