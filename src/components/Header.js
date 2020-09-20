import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('C');

  const handleAlignment = (event, newAlignment) => {
    console.log("newAlignment",newAlignment)
    console.log("alignment",alignment)
    if (newAlignment!=null&&newAlignment!=alignment)
    dispatch(TempActions['SET_UNITS']())
    setAlignment(newAlignment);

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="C" aria-label="left aligned" disabled={alignment=='C'?true:false}>
            {'\xB0C'}
            </ToggleButton>
            <ToggleButton value="F" aria-label="right aligned" disabled={alignment=='F'?true:false}>
            {'\xB0F'}
            </ToggleButton>
          </ToggleButtonGroup>
          <Button color="inherit" component={Link} to='/'>Home</Button>
          <Button color="inherit" component={Link} to='/favorites'>Favorites</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
