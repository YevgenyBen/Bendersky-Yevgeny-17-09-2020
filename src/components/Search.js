import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import CurrentLocationActions from '../actions/CurrentLocationActions'

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { autocomplete } from './autocomplete.json'
import swal from 'sweetalert';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '30px'
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
     
    },
    searchBox: {
        backgroundColor: 'white',
        width: '400px',
    },
    button: {
        padding: '15px',
        marginLeft: '5px'
    }
}))

export default function Search() {
    const dispatch = useDispatch();
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState(undefined)
    const classes = useStyles();

    async function handleInputChange(event) {
        // console.log(event.target.value)
        try {
            // let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=2Hc18OxAstuPAYeQAG7XMNPzwGaKSSir&q=${event.target.value}`)
            let response = autocomplete
            // console.log(response)
            let fullList = [
                {
                    locationKey: '',
                    location: ''
                }
            ]
            //add response.data from real API
            response.map((item) => {
                fullList.push({
                    locationKey: item.Key,
                    location: item.LocalizedName
                })
            })
            setCities(fullList)

        } catch (err) {
            swal("error on fetch location key")
        }
    }

    function handleSelectionChange(event) {
        setSelected(event.target.innerText)
    }

    function handleClick() {
        console.log(selected)
        if (selected != undefined) {
            dispatch(CurrentLocationActions['SET_LOCATION'](
                cities.find((item) => item.location == selected)
            ))
        }
    }



    return (
        <div className={classes.root}>
            <div className={classes.searchBar}>
                <Autocomplete
                    className={classes.searchBox}
                    id="city-search"
                    onInputChange={handleInputChange}
                    onChange={handleSelectionChange}
                    noOptionsText="No result"
                    options={cities}
                    popupIcon={null}
                    getOptionSelected={(option) => option}
                    getOptionLabel={(option) => option.location}
                    renderInput={(params) => <TextField {...params} label="City Search" variant="outlined" />}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
                    Search
                 </Button>
            </div>
        </div>
    )

}