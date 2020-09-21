import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FavoriteActions from "../actions/FavoriteActions";
import { useDispatch } from "react-redux";

import './FavoriteButton.css'

const useStyles = makeStyles(() => ({
    button: {
        height: '50px',
        width: '50px',
        margin: '10px',
        display: 'flex',
        alignItems: 'end',
        alignSelf:'auto'
    },
    icon: {
        width: '50px',
        height: '50px',
        color: 'white'
    }
}))



function FavoriteButton({ locationKey, location, isFavorite }) {
    const dispatch = useDispatch();
    const nodeRef = useRef(null)
    const handleClick = () => {
        isFavorite ? (
            dispatch(FavoriteActions['REMOVE_FAVORITE']({
                locationKey: locationKey,
                location: location
            })))
            :
            dispatch(FavoriteActions['ADD_FAVORITE']({
                locationKey: locationKey,
                location: location
            }))

        isFavorite ? toast(`${location} removed from favorites`) : toast(`${location} added to favorites`)
    }

    const classes = useStyles();
    return (
        <>
            <IconButton size='small' className={classes.button + ' fav'} onClick={handleClick}>
                {isFavorite
                    ?
                    <CSSTransition
                        nodeRef={nodeRef}
                        classNames="favorite-button"
                        timeout={{ enter: 500, exit: 300 }}
                        in={isFavorite}
                    >
                        <FavoriteIcon ref={nodeRef} className={classes.icon} />
                    </CSSTransition>
                    :
                    <CSSTransition
                        nodeRef={nodeRef}
                        classNames="favorite-button"
                        timeout={{ enter: 500, exit: 200 }}
                        in={isFavorite}
                    >
                        <FavoriteBorderIcon ref={nodeRef} className={classes.icon} />
                    </CSSTransition>

                }

            </IconButton>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>


    )
}

export default FavoriteButton
