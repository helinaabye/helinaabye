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
import EmailIcon from '@material-ui/icons/Email';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { purple } from '@material-ui/core/colors'

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
  media: {
     height: 0,
     paddingTop: '56.25%' // 16:9
  },
  card: {
     position: 'relative',
  },
  playPause: {
    color: purple[700]
  },
  overlay: {
    opacity: 0,
    height: '444px',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    width: 'inherit',
    fontSize: '4rem',
    "&:touch": {
      display: "flex !important",
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0.5)"
      },
    "&:hover": {
      display: "flex !important",
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0.5)"
      }
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
  const [overlay, setOverlay] = useState(null)
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

  const handlePlayPause = () => {
    if(vidRef.current.paused || vidRef.current.ended) {
      vidRef.current.play()
      setOverlay(
        <CardMedia className={classes.overlay}>
          <PauseCircleOutlineIcon fontSize="inherit" className={classes.playPause}/>
        </CardMedia>
      )
    } else if (!vidRef.current.paused && !vidRef.current.ended) {
      vidRef.current.pause()
      setOverlay(
        <CardMedia className={classes.overlay}>
          <PlayCircleOutlineIcon fontSize="inherit" className={classes.playPause}/>
        </CardMedia>
      )
    }
  }
  
  useEffect(() => {
    if (vidRef!==null) {
      vidRef.current.volume = 0
      vidRef.current.play()
      setOverlay(
        <CardMedia className={classes.overlay}>
          <PauseCircleOutlineIcon fontSize="inherit" className={classes.playPause}/>
        </CardMedia>
      )
    }
  }, [vidRef, classes])

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
              <a href="mailto:helinaago@gmail.com"  target="_blank"  rel="noopener noreferrer"
                className="github social">
                <EmailIcon size="1x"/>
              </a>
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
              <CardActionArea className={classes.card} onClick={() => handlePlayPause()}>
                {overlay}
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
                <Button size="small" onClick={() => vidRef.current.play()} className={classes.playPause}>
                  Play
                </Button>
                <Button size="small" onClick={() => vidRef.current.pause()}  className={classes.playPause}>
                  Pause
                </Button>
                <Button size="small" href="https://blogsie.herokuapp.com/"  target="_blank"  rel="noopener noreferrer"  className={classes.playPause}>
                  Visit Blogsie
                </Button>
              </CardActions>
            </Card>
        </Grid>  
      </Grid>
      </header>
      
      <footer className={classes.footer}>
        <Grid  container   className={classes.content} >
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
