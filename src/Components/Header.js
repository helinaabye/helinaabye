import React from 'react';
import {  faTwitter, faGithub, faMediumM } from "@fortawesome/free-brands-svg-icons";
import {  faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, AppBar, Grid, Avatar, Tooltip } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import helina from '../images/helinaabye.jpg'

const useStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: '#fff',
    color: 'primary',
    opacity: '0.8'
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
    marginRight: '15px'
  },
}));

const Header = ({ history }) => {
  const classes = useStyles();

  return (
      <AppBar  
      position="fixed"  
      className={classes.color} >
      <Toolbar
      className={classes.toolbar}>
        <Grid container>
          <Grid item  className={classes.contentStart} xs={5}>
            <Avatar className={classes.avatar} alt="Helina Abye" src={helina} />
            <Typography
            variant="h6"
            align="center"
            color="primary"
            noWrap
            onClick={() => {history.push('/')}}
          >
            Helina Abye
          </Typography>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={5} className={classes.contentEnd}>
            <Grid item xs={2} sm={1}>
              <Tooltip title="Email">
              <a href="mailto:helinaago@gmail.com"  target="_blank"  rel="noopener noreferrer"
                >
                <FontAwesomeIcon icon={faEnvelope} size="1x"  color="#3f51b5"/>
              </a>   
              </Tooltip>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Tooltip title="Medium">
              <a href="https://medium.com/@helinaabye"  target="_blank"  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faMediumM} size="1x"  color="#3f51b5"/>
                </a>
                </Tooltip>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Tooltip title="Twitter">
              <a href="https://www.twitter.com/coderette_" target="_blank"  rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faTwitter} size="1x"  color="#3f51b5"/>
              </a>
              </Tooltip>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Tooltip title="Github">
              <a href="https://github.com/helinaabye"  target="_blank"  rel="noopener noreferrer"
               >
                <FontAwesomeIcon icon={faGithub} size="1x" color="#3f51b5"/>
              </a>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      </AppBar>
  );
}

export default withRouter(Header);