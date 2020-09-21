import React from 'react'
import { useSelector } from "react-redux";

import FavoriteCard from '../components/FavoriteCard'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    container: {
        margin: '50px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    subHeader: {
        display: 'flex',
        justifyContent: 'center',
        fontSize:'1.5rem'
    }
}))

function FavoritesPage() {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favoritesReducer);
    const isFahrenheit = useSelector((state) => state.tempReducer.Fahrenheit);
    console.log('favorites: ', favorites)
    return (
        <div>
            <div className={classes.subHeader}>
                Click a city to go to a five day forecast
            </div>
            <div className={classes.container}>
                {favorites.map((item, index) =>
                    <FavoriteCard key={index} locationKey={item.locationKey} location={item.location} isFahrenheit={isFahrenheit} />
                )}
            </div>
        </div>
    )
}

export default FavoritesPage
