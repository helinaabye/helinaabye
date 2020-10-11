import React, { useEffect, useState, useRef } from 'react';
import {  faTwitter, faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Typography, Link, Hidden, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { list } from './imgList'
import Blogsie from './video/BlogsiePreview.mp4'
import './app.css';

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  arrowIcon: {
    color: "#fff"
  },
  link: {
    color: "#96cff0"
  }, 
  root: {
    maxWidth: 345,
    marginTop: "50px"
  },
  text: {
    padding: theme.spacing(3, 1),
  },
  footer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#282045',
    color: '#fff'
  },
}));

function App() {
  const [date, setDate] = useState(null)
  const [index, setIndex] = useState(0)
  const vidRef = useRef(null);
  const classes = useStyles();
  const imgList = list;

  const handleChangeImg = (direction) => {
    if (direction === "next") {
      if (index+1 !== imgList.length) {
        setIndex(index + 1)
      }
    } 
    if (direction === "back") {
      if (index !==0 ) {
      setIndex(index - 1)
      }
    }
  }

  useEffect(() => {
        setInterval(
            () => setDate(new Date().toLocaleString("en-US", {timeZone: "Africa/Kampala"})),
            1000
          );
  }, [])

  return (
    <div className="App">
    <header className="App-header">
      <Grid item container md={10} justify="center" alignItems="center"  >        
        <Grid item container sm={12} md={6} spacing={2}  className={classes.content}>
          <Grid item container className={classes.content} xs={10} sm={6} md={10}>
          <Grid item xs={12}><div className={classes.text}></div></Grid>
              <Grid item xs={2}>
                  <IconButton 
                  className={classes.arrowIcon}
                  onClick={() => handleChangeImg("back")}>
                    <ArrowBackIosIcon/>
                  </IconButton>
                </Grid>
                <Grid item container className={classes.content} xs={8}>
                  <Hidden mdUp>
                    <img src={imgList[index]} width="250px" alt="chibird motivation card"/>
                  </Hidden>
                  <Hidden smDown>
                    <img src={imgList[index]} width="300px" alt="chibird motivation card"/>
                  </Hidden>
                </Grid>
                <Grid item xs={2}>
                  <IconButton 
                  className={classes.arrowIcon}
                  onClick={() => handleChangeImg("next")}>
                    <ArrowForwardIosIcon/>
                  </IconButton>
                </Grid>
                <Grid item container   className={classes.content} xs={12}>
                  <Typography  variant="caption">
                    Awesome motivational art from <Link className={classes.link}  target="_blank"  rel="noopener noreferrer" href="https://chibird.com/">Chibird</Link>!
                  </Typography>
                </Grid>   
            </Grid>
          <Grid item xs={12}>
            <div className={classes.text}>
              <Typography variant="h6">
                Hello! I am Helina, a Software Developer.
              </Typography> 
              <Grid item container className={classes.content}>
              <a href="https://medium.com/@helinaabye"  target="_blank"  rel="noopener noreferrer"
                className="github social">
                <FontAwesomeIcon icon={faMedium} size="1x" />
              </a>
              <a href="https://www.twitter.com/coderette_" target="_blank"  rel="noopener noreferrer" className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </a>
              <a href="https://github.com/helinaabye"  target="_blank"  rel="noopener noreferrer"
                className="github social">
                <FontAwesomeIcon icon={faGithub} size="1x" />
              </a>
            </Grid>
              <Typography variant="h6">
              The current date and time in Ethiopia is
              </Typography> 
              <Typography variant="h6">
                
              {date}<br/>
                “Don't count the days. Make the days count.”<br/> Muhammad Ali
              </Typography> 
              <Typography variant="h6">
              Check out Blogsie, built with<br/> React, Node, Express, Postgres.
              </Typography> 
            </div>
          </Grid>

        </Grid>

        <Grid item container className={classes.content} sm={12} md={6}>
          <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="video"
                  alt="Blogsie app preview"
                  height="444"
                  src={Blogsie}
                  title="Blogsie app preview"
                  ref={vidRef}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Blogsie
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Blgosie is a simple blog app where you can create, draft and publish posts.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" onClick={() => vidRef.current.play()} color="primary">
                  Play
                </Button>
                <Button size="small" onClick={() => vidRef.current.pause()} color="primary">
                  Pause
                </Button>
              {//  <Button size="small" 
                 // href="https://blogsie.herokuapp.com/"  target="_blank"  rel="noopener noreferrer" 
                 // color="primary">
                 // Visit Blogsie
              //  </Button> 
               }
              </CardActions>
            </Card>
        </Grid>  
      </Grid>
      </header>
      
      <footer className={classes.footer}>
        <Grid  container   className={classes.content} xs={12}>
          <Typography  variant="caption" >
            {'Copyright © '}
            {new Date().getFullYear()}
            {', Helina Abye'}
          </Typography>
        </Grid>
      </footer>
    </div>
  );
}

export default App;
