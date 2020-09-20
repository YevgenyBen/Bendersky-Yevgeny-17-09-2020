import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
      
    },
    button: {
        padding: '5px',
        marginLeft:'5px'
    }
}))

export default function Search() {
    const [cities, setCities] = useState([])
    const classes = useStyles();

    async function handleChange(event) {
        // console.log(event.target.value)
        try {
            let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=2Hc18OxAstuPAYeQAG7XMNPzwGaKSSir&q=${event.target.value}`)
            console.log(response)
            var cityList = []
            response.data.map((item) => {
                cityList.push(item.LocalizedName)
            })
            setCities(cityList)

        } catch (err) {
            console.log("error on fetch location key")
        }
    }

    



    return (
        <div className={classes.root}>
            <div className={classes.searchBar}>
                {/* <InputBase className={classes.searchBox}
                onChange={handleChange}
                placeholder=" Search…"
                inputProps={{ 'aria-label': 'search' }}
            /> */}
                <Autocomplete
                    className={classes.searchBox}
                    id="combo-box-demo"
                    onInputChange={handleChange}
                    noOptionsText="No result"
   
                    options={cities}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    Primary
                 </Button>
            </div>
        </div>
    )

}