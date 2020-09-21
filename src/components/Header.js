import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDispatch } from "react-redux";
import TempActions from '../actions/TempActions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    fontSize: '20px'
    
  },
  active: {
    fontSize: '25px',
    fontWeight: 'bold',
    textDecoration:'underline blue'
  }
}));

export default function Header({ }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [alignment, setAlignment] = useState('C');
  const [selected,setSelected] = useState(window.location.pathname==='/'?'HOME':'FAVORITES')


  const handleAlignment = (event, newAlignment) => {
    dispatch(TempActions['SET_UNITS']())
    setAlignment(newAlignment);
  };

  const toggleClass=(event)=>{
    setSelected(event.target.innerText)
  }
  return (
    <Toolbar className={classes.root+' header'}>
      <Typography variant="h6" className={classes.title}>
        Weather App
          </Typography>
      <div>
      <Button onClick={toggleClass} className={selected==='HOME'?classes.active:''+classes.button} color="inherit"  component={Link} to='/'>Home</Button>
      <Button onClick={toggleClass} className={selected==='FAVORITES'?classes.active:''+classes.button} color="inherit"  component={Link} to='favorites'>Favorites</Button>
      </div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="C" aria-label="left aligned" disabled={alignment === 'C' ? true : false}>
          {'\xB0C'}
        </ToggleButton>
        <ToggleButton value="F" aria-label="right aligned" disabled={alignment === 'F' ? true : false}>
          {'\xB0F'}
        </ToggleButton>
      </ToggleButtonGroup>

    </Toolbar>
  );
}
