import React, { useState, useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {autocomplete} from './autocomplete.json'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '10px'
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px'
    },
    searchBox: {
        backgroundColor: 'white',
        width: '300px',
        padding: '6px'

    },
    button: {
        padding: '5px',
        marginLeft: '5px'
    }
}))

export default function Search() {
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState('')
    const classes = useStyles();

    async function handleInputChange(event) {
        // console.log(event.target.value)
        try {
            // let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=2Hc18OxAstuPAYeQAG7XMNPzwGaKSSir&q=${event.target.value}`)

            let response = autocomplete
            console.log(response)
            let fullList = [
                {
                    key: '',
                    city: ''
                }
            ]
            //add response.data from real API
            response.map((item) => {
                fullList.push({
                    key: item.Key,
                    city: item.LocalizedName
                })
            })
            setCities(fullList)

        } catch (err) {
            console.log("error on fetch location key")
        }
    }

    function handleSelectionChange(event) {
        console.log("select", event.target.innerText)
    }

    function handleClick() {
        console.log(process.env)
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
                    getOptionLabel={(option) => option.city}
                    renderInput={(params) => <TextField {...params} label="City Search" variant="outlined" />}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
                    Primary
                 </Button>
            </div>
        </div>
    )

}