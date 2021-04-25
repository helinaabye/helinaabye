import React from 'react';
import {  faTwitter, faGithub, faMediumM } from "@fortawesome/free-brands-svg-icons";
import {  faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Avatar, Tooltip, Divider, Hidden, IconButton, Button } from '@material-ui/core';
import helina from '../images/helinaabye.jpg'
import classnames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import js from '../icons/js.png';
import html from '../icons/html.png';
import css from '../icons/css.jpg';
import react from '../icons/react.png';
import node from '../icons/nodejs.png';
import express from '../icons/expressjs.svg';
import materialui from '../icons/materialui.png';
import firebase from '../icons/firebase.png';
import heroku from '../icons/heroku.jpg';
import postgres from '../icons/postgres.jpg';
import git from '../icons/git.jpg';
import github from '../icons/github.png';
import Slider from '../Components/SkillSlider';

const useStyles = makeStyles((theme) => ({
  color: {
    color: '#fff',
  },
  side: {
    backgroundImage: "linear-gradient(to bottom, rgba(75,0,180,0), rgba(75,0,180,0.8))",
    color: "#3f51b5",
    padding: theme.spacing(8, 1),
    backgroundColor: "#2fa6ee"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentStart: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  contentEnd: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  toolbar: {
    minHeight: '50px'
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    }
  },
  icons: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    "&:hover": {  
      transition: theme.transitions.create(["width", "height"], {
      duration: 100
          }),
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  root: {
    height: "100vh"
  },
  main: {
    height: "100%"
  },
  contact: {
    padding: theme.spacing(3, 1),
  },
  responsive: {
    fontSize: "2rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.5rem"
        }
  },
  responsiveBody: {
    fontSize: "1.2rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem"
        }
  },
  bio: {
    padding: theme.spacing(3, 1),
    fontSize: "1.2rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem"
        }
  },
  back: {
    // backgroundColor: "#fff", 
    color: "#fff",   
    "&:hover": {
      color: "white !important",
      // backgroundColor: "#1976d2"
    },
    marginBottom: "10px"
  },
  backText: {
    backgroundColor: "#1976d2"
  },
  divider: {    
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {    
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  buttonContact: {    
    color: "#3f51b5",
    backgroundColor: "#fff", 
    "&:hover": {
      color: "#fff",
      backgroundColor: "#1976d2"
    },
  },
  title: {     
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: "default",
  },
  magnify: {
    "&:hover": {
      fontSize: "1.5rem"
    },
  }
}));

const Profile = ({ history }) => {
  const classes = useStyles();

  return ( 
      <Grid container className={classes.root}>
        <Grid container className={classnames(classes.side, classes.content)} sm={12} md={6}>
        <Hidden mdUp>
          <Grid item  xs={12} >
                  <Tooltip title="Go Back" placement="right">
            <IconButton size="small" color="primary"  
                onClick={() => {history.push('/')}} className={classnames(classes.back)}>
            <ChevronLeftIcon/>
          </IconButton>
                  </Tooltip>
          </Grid>
          </Hidden>
          <Grid item container className={classes.content} xs={12}>
            <Avatar className={classnames(classes.avatar, classes.title)} alt="Helina Abye" src={helina} />
          </Grid>
          <Grid item container className={classes.content} xs={12}>
            <Typography
            variant="h4"
            align="center"
            className={classnames(classes.color, classes.title, classes.responsive)}
          >
            Helina Abye
          </Typography>        
          </Grid>
        <Grid container xs={12} direction="row" className={classnames(classes.content, classes.contact, classes.responsiveBody)}>
        <Grid item xs={2} sm={1}>
                  <Tooltip title="Email">
                  <a href="mailto:helinaago@gmail.com"  target="_blank"  rel="noopener noreferrer"
                    >
                    <FontAwesomeIcon icon={faEnvelope} className={classes.magnify} size="1x"  color="#fff"/>
                  </a>   
                  </Tooltip>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Tooltip title="Medium">
                  <a href="https://medium.com/@helinaabye"  target="_blank"  rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faMediumM} className={classes.magnify} size="1x"  color="#fff"/>
                    </a>
                    </Tooltip>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Tooltip title="Twitter">
                  <a href="https://www.twitter.com/coderette_" target="_blank"  rel="noopener noreferrer" >
                    <FontAwesomeIcon icon={faTwitter} className={classes.magnify} size="1x"  color="#fff"/>
                  </a>
                  </Tooltip>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Tooltip title="Github">
                  <a href="https://github.com/helinaabye"  target="_blank"  rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} className={classes.magnify} size="1x" color="#fff"/>
                  </a>
                  </Tooltip>
                </Grid>
        </Grid>
    </Grid>
    
    <Hidden smUp>
      <Grid item xs={12} className={classes.contact}>
        
        </Grid>
      </Hidden>

      
    <Grid container  className={classes.content} sm={12} md={6}>
      <Grid item container className={classes.content} xs={10}>
        {/* <Typography
        variant="h4"
        align="center"
        color="primary"
        className={classes.responsive}
      >
        Bio
      </Typography> */}
        <Typography
        variant="h6"
        align="center"
        color="primary"
        className={classes.bio}
      >
        Passionate self taught software developer currently focusing on full stack web development. I believe software has the ability to change and improve people’s lives. 
      </Typography>
      </Grid>
      <Grid item xs={12} >
      <Divider  variant="middle" className={classes.divider}/>
        </Grid>
      <Grid item container className={classes.content} xs={10}>
        {/* <Typography
        variant="h4"
        align="center"
        color="primary"
        className={classes.responsive}
      >
        Tech
      </Typography> */}
        {/* <Typography
        variant="h6"
        align="center"
        color="primary"
        className={classes.responsiveBody}
      >
        JavaScript, React, Material UI, Node, Express, Postgres, Heroku, Git, CSS, HTML  
      </Typography> */}
      <Grid item container spacing={2} className={classes.content}>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={js} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={html} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={css} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={react} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={node} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={express} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={firebase} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={materialui} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={postgres} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={heroku} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={git} />
        </Grid>
        <Grid item>
          <Avatar className={classes.icons} alt="Helina Abye" src={github} />
        </Grid>
      </Grid>
      </Grid> 
      <Grid item xs={12} className={classes.contact}>
      <Divider  variant="middle"  className={classes.divider}/>
        </Grid>
      <Grid item container className={classes.content} xs={10}>
        {/* <Typography
        variant="h4"
        align="center"
        color="primary"
        className={classes.responsive}
      >
        Skills
      </Typography>
        <Typography
        variant="h6"
        align="center"
        color="primary"
        className={classes.responsiveBody}
      >
        Communication, Team Work, Fast Learner, Quality Focused, Efficent Delivery  
      </Typography> */}
      <Slider/>
      </Grid>
      <Grid item  xs={12}  className={classes.button}>
        <Button color="primary"
            onClick={() => {history.push('/')}} variant="contained">
        <ChevronLeftIcon/>{` Back `}
      </Button>
      </Grid>
    </Grid>
    </Grid>
  )
}

export default Profile;