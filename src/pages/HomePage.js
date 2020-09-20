import React, { useEffect } from 'react'
import Search from '../components/Search'
import FavoriteButton from '../components/FavoriteButton'
import ForecastCard from '../components/ForecastCard'
import ForecastTemp from '../components/ForecastTemp'
import ForecastDate from '../components/ForecastDate'
import WeatherIcon from '../components/WeatherIcon'
import Location from '../components/Location'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import axios from 'axios'
import './HomePage.css'



//api calls cached
import { fiveDayData } from './5dayData.json'


function HomePage() {

    const apiKey = '2Hc18OxAstuPAYeQAG7XMNPzwGaKSSir';
    const locationKey = '215854';
    const location = 'Tel Aviv'

    const getLocationKey = async (location) => {
        try {
            let response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${location}`)
            return response.data[0].Key;
        } catch (err) {
            console.log("error on fetch location key")
        }
    };

    const getLocationWeather = async (locationKey) => {
        try {
            let response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&metric=true`)
            return response.data.DailyForecasts[0];
        } catch (err) {
            console.log("error on fetch one day forcast")
        }
    };

    const getFiveDayForecast = async (locationKey) => {
        try {
            let response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`)
            return response.data.DailyForecasts[0];
        } catch (err) {
            console.log("error on fetch one day forcast")
        }
    }

    useEffect(() => {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //       console.log("latitude",position.coords.latitude,"longtitude", position.coords.longitude)
        //     })
        //   }
        console.log(fiveDayData)
        // const locationKey = getLocationKey('tel-aviv');
        // console.log("location key", locationKey)
        const locationKey = '215854';
        // const oneDayForecast= getLocationWeather(locationKey)
        // console.log("one day forcast", oneDayForecast)

    }, [])

    return (
        <>
            <Container maxWidth='lg'>
                <Search />
                <Paper>
                <div className='wrapper'>
                    <WeatherIcon />
                    <FavoriteButton />
                    <ForecastDate date={fiveDayData.DailyForecasts[0].EpochDate}/>
                    <ForecastTemp temp={fiveDayData.DailyForecasts[0].Temperature}/>
                    <Location location={location}/>
                    <div className='forecast-card-holder'>
                        {fiveDayData.DailyForecasts.map((item,index) =>
                            <ForecastCard key={index} temp={item.Temperature} date={item.EpochDate}/>
                        )}
                    </div>

                </div>
                </Paper>
            </Container>
        </>
    )
}

export default HomePage;
