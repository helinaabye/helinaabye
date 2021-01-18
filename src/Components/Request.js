import React, { useState , useContext } from 'react';
import { Button, TextField, Paper, Grid, Typography, Hidden, ClickAwayListener, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Chibird from '../video/tenor.gif'
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
}));

const Request = (props) => {
  const classes = useStyles();
  const { address } = useContext(ApiContext)
  const { type, handleClose, handleClick } = props;
  const [ submission, setSubmission ] = useState({type: type, name: '', email: '', message: ''});
  const [ error, setError ] = useState("")

  const onSubmit = (e) => {
    e.preventDefault(); 
    const format = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    if (submission.name!=='' && submission.email!=='' && format.test(submission.email)) {
      axios.post(`${address}/requests`, submission)
      .then(({data}) => {
        if (data) {
          emailjs.send('service_7wbe3vq', 'template_uonez39', submission, 'user_MMcxErFGsXQxqr9T3pnpe')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          handleClose()
          handleClick()
        }
      })
    } else if (submission.name==='') {
      setError('Please enter a name')
    } else if (submission.email==='' || !format.test(submission.email)) {
      setError('Please enter valid email address')
    }  
  }

  return (
      <div className={classes.image}>
      <ClickAwayListener onClickAway={() => handleClose()}>
      <Grid item container xs={12} sm={8} md={6} direction="row" component={Paper} elevation={6} square>
        <Grid container className={classes.paper}>
          <Grid item xs={12} className={classes.close}>
            <IconButton color="secondary" size="small" onClick={() => handleClose()}><CancelIcon/></IconButton>
          </Grid>
          <Grid item xs={12} sm={6}>
        <Hidden smDown>
          <Grid item  xs={12}>
                      <img src={Chibird} alt="Chibird penguin hug" width="250px" />
                </Grid>
                </Hidden>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Grid item xs={12}> 
          { type==="build" ? (
            <Typography color="primary" variant="h5">
            Web App / Site
            </Typography>
          ) : type==="design" ? (
            <Typography color="primary" variant="h5">
            Web Design
            </Typography>
          ) : (
            <Typography color="primary" variant="h5">
            Contact
            </Typography>)}
           </Grid>
        <Grid item xs={12}>
          { error===''? (
          <Typography variant="body1">
            Please enter your name and email<br/>
            I will get back to you soon!
          </Typography>
          ): (
            <Typography variant="body1" color="secondary">
              {error}
            </Typography>
          )}
        </Grid>
          <Grid item xs={12}>  
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
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
                    onChange={(e) => setSubmission({...submission, name: e.target.value})}
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
                    onChange={(e) => setSubmission({...submission, email: e.target.value})}
                    />
                </Grid>
                { type==="contact" ? (
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        autoComplete="message"
                        onChange={(e) => setSubmission({...submission, message: e.target.value})}
                        />
                    </Grid>
                  ) : (null)
                }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            { type==='contact' ? ('Send Message') : ('Submit Request') }           
            </Button>
          </form>
        </Grid>
          </Grid>
       
        
        </Grid>   
      </Grid>
      </ClickAwayListener>
      </div>
  );
}

export default withRouter(Request);