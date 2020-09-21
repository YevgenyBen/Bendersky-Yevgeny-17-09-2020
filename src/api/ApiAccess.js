import swal from 'sweetalert';
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY;

const ApiAccess = {


    getLocationKey: async (location) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_KEY + apiKey + `&q=${location}`)
            return response.data[0];
        } catch (err) {
            swal("error on fetch location key,might you have used your fifty tries?")
        }
    },

    getLocationWeather: async (locationKey) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_WEATHER + locationKey + `?apikey=${apiKey}&metric=true`)
            return response.data;
        } catch (err) {
            swal("error on fetch one day forcast,might you have used your fifty tries?")
        }
    },
    getFiveDayForecast: async (locationKey) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_LOCATION_WEATHER_FIVE_DAY + locationKey + `?apikey=${apiKey}&metric=true`)
            return response.data;
        } catch (err) {
            swal("error on fetch five day forcast,might you have used your fifty tries?")
        }
    },

    getLocationKeyFromGeo: async (latitude, longtitude) => {
        try {
            let response = await axios.get(process.env.REACT_APP_GET_GEO_LOCATION + apiKey + `&q=${latitude},${longtitude}`)
            return response.data;
        } catch (err) {
            swal("error on fetch key from geo,might you have used your fifty tries?");
        }
    }
}

export default ApiAccess;