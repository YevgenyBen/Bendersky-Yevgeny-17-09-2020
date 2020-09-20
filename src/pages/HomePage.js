import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";


import Search from '../components/Search'
import FavoriteButton from '../components/FavoriteButton'
import ForecastCard from '../components/ForecastCard'
import ForecastTemp from '../components/ForecastTemp'
import ForecastDate from '../components/ForecastDate'
import WeatherIcon from '../components/WeatherIcon'
import Location from '../components/Location'
import CurrentLocationActions from '../actions/CurrentLocationActions'


import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';


import axios from 'axios'
import './HomePage.css'

const useStyles = makeStyles(() => ({
    size: {
        height: '100px',
        minWidth: '100px',
        margin: '10px'
    },
    tempText: {
        fontSize: '50px'
    },
    mainCard: {
        backgroundImage: 'url("paper.gif")'
    }
}))


function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [fiveDayData, SetFiveDayData] = useState()
    // const [currentLocation, setCurrentLocation] = useState({
    //     locationKey: "",
    //     location: ""
    // })
    const apiKey = process.env.REACT_APP_API_KEY;
    const favorites = useSelector((state) => state.favoritesReducer);
    // console.log('favorites: ', favorites)
    const current = useSelector((state) => state.currentLocationReducer);
    // console.log("current", current);
    const isFahrenheit = useSelector((state) => state.tempReducer.Fahrenheit);



    const getLocationKey = async (location) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_KEY + apiKey + `&q=${location}`)
            return response.data[0];
        } catch (err) {
            swal("error on fetch location key")
        }
    };

    const getLocationWeather = async (locationKey) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_WEATHER + locationKey + `?apikey=${apiKey}&metric=true`)
            return response.data.DailyForecasts[0];
        } catch (err) {
            swal("error on fetch one day forcast")
        }
    };

    const getFiveDayForecast = async (locationKey) => {
        // console.log("incoming key", locationKey)
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_WEATHER_FIVE_DAY + locationKey + `?apikey=${apiKey}&metric=true`)
            console.log("response", response)
            return response.data;
        } catch (err) {
            swal("error on fetch five day forcast")
        }
    }

    const getLocationKeyFromGeo = async (latitude, longtitude) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_GEO_LOCATION + apiKey + `&q=${latitude},${longtitude}`)
            console.log("response", response)
            return response.data;
        } catch (err) {
            swal("error on fetch key from geo");
        }
    }

    useEffect(() => {
        if (current.locationKey) {
            getFiveDayForecast(current.locationKey)
                .then(result => {
                    SetFiveDayData(result)
                    console.log(fiveDayData)
                })
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("latitude", position.coords.latitude, "longtitude", position.coords.longitude)
                    getLocationKeyFromGeo(position.coords.latitude, position.coords.longitude)
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
                getLocationKey("tel aviv")
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
    }, [current])

    return (
        <>
            <Container maxWidth='lg'>
                <Search />
                <Paper elevation={10}>
                    <div className='cover'>
                    {fiveDayData && <div className='wrapper'>

                        <div className={classes.tempText + ' icon'}>
                            {fiveDayData.DailyForecasts[0].Day.IconPhrase}
                            <WeatherIcon iconNumber={fiveDayData.DailyForecasts[0].Day.Icon} />
                        </div>
                        {favorites.find(item =>
                            item.location == current.location
                        ) ? <FavoriteButton locationKey={current.locationKey} location={current.location} isFavorite={true} /> :
                            <FavoriteButton locationKey={current.locationKey} location={current.location} isFavorite={false} />
                        }
                        <ForecastDate date={fiveDayData.DailyForecasts[0].EpochDate} />
                        <ForecastTemp temp={fiveDayData.DailyForecasts[0].Temperature} isFahrenheit={isFahrenheit} />
                        <Location location={current.location} />
                        <div className='forecast-card-holder'>
                            {fiveDayData.DailyForecasts.map((item, index) => {
                                return <ForecastCard key={index} temp={item.Temperature} date={item.EpochDate} iconNumber={item.Day.Icon} isFahrenheit={isFahrenheit} />
                            }

                            )}
                        </div>
                    </div>}
                    </div>

                </Paper>
            </Container>
        </>
    )
}

export default HomePage;
