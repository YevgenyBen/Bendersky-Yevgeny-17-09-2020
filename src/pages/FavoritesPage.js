import React from 'react'
import {range} from 'lodash'
import FavoriteCard from '../components/FavoriteCard'
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
    let array=range(7);
    console.log(array)
    return (
        <div className={classes.container}>
            {array.map((index)=>{
               return <FavoriteCard key={index}/>
            })}
        </div>
    )
}

export default FavoritesPage
