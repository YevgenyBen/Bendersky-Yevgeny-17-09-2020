import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDispatch } from "react-redux";
import TempActions from '../actions/TempActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'20px'
  },
  title: {
    flexGrow: 1,
  },
  marginLeft:{
    marginLeft:'10px'
  }
}));

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('C');

  const handleAlignment = (event, newAlignment) => {
    dispatch(TempActions['SET_UNITS']())
    setAlignment(newAlignment);
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Weather App
          </Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="C" aria-label="left aligned" disabled={alignment == 'C' ? true : false}>
            {'\xB0C'}
          </ToggleButton>
          <ToggleButton value="F" aria-label="right aligned" disabled={alignment == 'F' ? true : false}>
            {'\xB0F'}
          </ToggleButton>
        </ToggleButtonGroup>
        <Button className={classes.marginLeft} color="inherit" component={Link} to='/'>Home</Button>
        <Button className={classes.marginLeft}color="inherit" component={Link} to='/favorites'>Favorites</Button>
      </Toolbar>

    </div>
  );
}
