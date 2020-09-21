import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CurrentLocationActions from "../actions/CurrentLocationActions";
import axios from 'axios'

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";

const apiKey = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        margin: "30px",
    },
    searchBar: {
        display: "flex",
        justifyContent: "center",
    },
    searchBox: {
        backgroundColor: "white",
        width: "400px",
    },
    button: {
        padding: "15px",
        marginLeft: "5px",
    },
}));

export default function Search() {
    const dispatch = useDispatch();
    const [cities, setCities] = useState([]);
    const [selected, setSelected] = useState(undefined);
    const classes = useStyles();

    async function handleInputChange(event) {
        if (event.target.value !== 0) {
            try {
                let response = await axios.get(process.env.REACT_APP_AUTOCOMPLETE + apiKey + `&q=${event.target.value}`)
                let fullList = [];
                response.data.map((item) => {
                    return fullList.push({
                        locationKey: item.Key,
                        location: item.LocalizedName,
                    });
                });
                setCities(fullList);
            } catch (err) {
                swal("error on auto complete");
            }
        }
    }

    function handleSelectionChange(event) {
        event.target.tagName === 'LI' && setSelected(event.target.innerText)
    }

    function handleClick() {
        if (selected !== undefined) {
            let locationAndKey = cities.find((item) => item.location === selected)
            console.log("locationAndKey", locationAndKey)
            if (locationAndKey) {
                dispatch(
                    CurrentLocationActions["SET_LOCATION"](locationAndKey)
                )
            }

        }
    }

    const handleHighlight = (event, option, reason) => {
        if (option) {
            if (reason === 'keyboard') {
                setSelected(option.location)
            }
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.searchBar}>
                <Autocomplete
                    className={classes.searchBox + ' search-bar'}
                    id="city-search"
                    onInputChange={handleInputChange}
                    onChange={handleSelectionChange}
                    noOptionsText="No result"
                    options={cities}
                    onHighlightChange={handleHighlight}
                    popupIcon={null}
                    getOptionSelected={(option) => option}
                    getOptionLabel={(option) => option.location}
                    renderInput={(params) => (
                        <TextField {...params} label="City Search" variant="outlined" />
                    )}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClick}
                >
                    Search
        </Button>
            </div>
        </div>
    );
}
