import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import  FavoriteActions  from "../actions/FavoriteActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
    button: {
        height: '100px',
        width: '100px',
        margin: '10px'
    },
    icon: {
        width: '90px',
        height: '90px'
    }
}))



function FavoriteButton({cityCode,location}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(FavoriteActions['ADD_FAVORITE']({
            key:cityCode,
            location:location
        }))
    }

    const classes = useStyles();
    return (
        <IconButton size='small' className={classes.button + ' fav'} onClick={handleClick}><FavoriteBorderIcon className={classes.icon} /></IconButton>
    )
}

export default FavoriteButton
