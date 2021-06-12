import React from 'react';
import { makeStyles,AppBar,Toolbar,Typography,Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: "white"
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/" variant="h5" className={classes.title}>
            Ls-interview
          </Typography>
          <Button component={Link} to="/list" color="inherit">List</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/register" color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}