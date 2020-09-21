import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";


import Search from '../components/Search'
import CurrentLocationActions from '../actions/CurrentLocationActions'
import MainCard from '../components/MainCard'
import ApiAccess from '../api/ApiAccess'


import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { CSSTransition } from 'react-transition-group';
import swal from 'sweetalert';

import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const [fiveDayData, SetFiveDayData] = useState()
    const favorites = useSelector((state) => state.favoritesReducer);
    // console.log('favorites: ', favorites)
    const current = useSelector((state) => state.currentLocationReducer);
    // console.log("current", current);
    const isFahrenheit = useSelector((state) => state.tempReducer.Fahrenheit);

    useEffect(() => {
        if (current.locationKey) {
            ApiAccess.getFiveDayForecast(current.locationKey)
                .then(result => {
                    SetFiveDayData(result)
                })
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("latitude", position.coords.latitude, "longtitude", position.coords.longitude)
                    ApiAccess.getLocationKeyFromGeo(position.coords.latitude, position.coords.longitude)
                        .then((location => {
                            dispatch(CurrentLocationActions['SET_LOCATION'](
                                {
                                    locationKey: location.Key,
                                    location: location.LocalizedName
                                }
                            ))
                        })).catch(err => {
                            swal('error in geo location')
                        })

                })
            } else {
                ApiAccess.getLocationKey("tel aviv")
                    .then((location => {
                        dispatch(CurrentLocationActions['SET_LOCATION'](
                            {
                                locationKey: location.Key,
                                location: location.LocalizedName
                            }
                        ))
                    }))
                    .catch(err => {
                        swal('error in getLocationKey')
                    })
            }
        }
        // eslint-disable-next-line
    }, [current])

    return (
        <>
            <Container maxWidth='lg'>
                <Search />
                <Paper elevation={10}>
                    {
                        fiveDayData
                        &&
                        <MainCard fiveDayData={fiveDayData} current={current} isFahrenheit={isFahrenheit} favorites={favorites} />
                    }
                </Paper>
            </Container>
        </>
    )
}

export default HomePage;
