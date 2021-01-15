import React from 'react';
import { Button, CssBaseline, TextField, Paper, Grid, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Chibird from '../video/tenor.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://unsplash.com/photos/hYjIYsJuyVQ/download?force=true&w=1920)',
    // backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Request = (props) => {
  const classes = useStyles();
  const { history } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} className={classes.image}>
      <Grid item container xs={12} sm={8} md={6} direction="row" component={Paper} elevation={6} square>
        <Grid container className={classes.paper}>
          <Grid item xs={12} sm={6}>
        <Hidden smDown>
          <Grid item  xs={12}>
                      <img src={Chibird} width="250px" />
                </Grid>
                </Hidden>
        <Grid item xs={12}>
          <Typography variant="p">
            Please enter your name and email<br/>
            I will get back to you soon!
          </Typography>
        </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Grid item xs={12}>  
        <form className={classes.form} noValidate onSubmit={(e) => {e.preventDefault(); history.go(0)} }>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            Submit Request           
            </Button>
          </form>
        </Grid>
          </Grid>
       
        
        </Grid>   
      </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(Request);