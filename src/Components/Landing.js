import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Hidden, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import Blogsie from '../video/BlogsiePreview.mp4'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { list } from '../imgList'
import { purple } from '@material-ui/core/colors'
import Modal from '@material-ui/core/Modal';
import Request from './Request'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontWeight: "bold",
    fontSize: "xxx-large"
  },
  avatarStyle: {
    position: 'absolute',
    zIndex: 1,
    height: '50vh',
    width: '100vw',
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  tagline: {
    backgroundColor: '#fff',
    padding: theme.spacing(4, 6, 4),
    opacity: 0.8
  },
  responsive: {
    fontSize: "3rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.5rem"
        }
  },
  responsiveBody: {
    fontSize: "2rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem"
        }
  },
  headerImg: {
    backgroundImage: 'url(https://unsplash.com/photos/gREi-9tI5Mg/download?force=true&w=1920)',
    height: "100vh",
    color: "#3f51b5",
  },
  sectionImg: {
    backgroundImage: 'url(https://unsplash.com/photos/aMPfitH2tT0/download?force=true&w=1920)',
    height: "800px",
  },
  footerImg: {
    backgroundImage: 'url(https://unsplash.com/photos/Xaanw0s0pMk/download?force=true&w=1920)',
    height: "50vh",
    color: "#fff",
  },
  position: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  positionTwo: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  padding: {
    padding: theme.spacing(8, 0, 6),
  },
  margin: {
    margin: theme.spacing(2, 0, 1),
  },
  custom: {
    color: '#fff',
    backgroundColor: purple[500]
  },
  root: {
    maxWidth: 345,
    marginTop: "50px"
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
  loading: {
    zIndex: 1,
    position: 'absolute'
  },
  overlay: {
    display: "flex !important",
    height: '444px',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    width: 'inherit',
    fontSize: '4rem',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    opacity: 0,
    "&:hover": {
      opacity: 1,
      },
    "&:active": {
      opacity: 1,
      },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'center',
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  const { history } = props;  
  const [index, setIndex] = useState(0)
  const [overlay, setOverlay] = useState(null)
  const [loading, setLoading] = useState(true)
  const vidRef = useRef(null);
  const smallimg = useRef(null);
  const bigimg = useRef(null);
  const imgList = list; 
  const [date, setDate] = useState(null)  
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Grid item container xs={12} className={classes.position}>
    <Grid item container xs={12} sm={8} md={6} elevation={6} square>
      <div className={classes.paper}>
        <Typography variant="p">
          Please enter your name and email<br/>
          I will get back to you soon!
        </Typography>
        <form className={classes.form} noValidate onSubmit={null}>
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
      </div>   
    </Grid>
    </Grid>
  );


  useEffect(() => {
    setInterval(
        () => setDate(new Date().toLocaleString("en-US", {timeZone: "Africa/Kampala"})),
        1000
      );
}, [])

  const handleChangeImg = (direction) => {
    setLoading(true)
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

  return (
           <>
          <CssBaseline />
           <Grid>
            <Grid item xs={12}>
              <div className={classnames(classes.imageStyle, classes.position, classes.headerImg)}>
                  <Typography className={classnames(classes.tagline, classes.responsive)} >
                    Unique, 
                    Customized,
                    Innovative  <br/>
                    Solutions
                  </Typography>
                </div>
            </Grid>
            <Grid item container xs={12} className={classnames(classes.padding, classes.position)}>
              <Grid item container  xs={10} md={6} className={classes.position}>
                <Container maxWidth="sm" component="main" className={classes.padding}>
                    <Typography align="center" color="primary" gutterBottom className={classes.responsive}>
                    Build
                    </Typography>
                    <Typography align="center" component="p"  className={classes.responsiveBody}>
                    Get a web app built to provide you with unique solutions and realize your goals.
                    </Typography>
                    <Button
                    variant="contained"
                    color="primary" 
                    className={classes.margin}
                    onClick={handleOpen}>
                      Request a web app
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {<Request/>}
                    </Modal>
                </Container>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classnames(classes.imageStyle, classes.position, classes.sectionImg)}>
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
                </div>
            </Grid>
            <Grid item container xs={12}  className={classnames(classes.padding, classes.position)}>
              <Grid item xs={10} md={6} className={classes.position}>
                <Container maxWidth="sm" component="main" className={classes.padding}>
                    <Typography align="center" gutterBottom className={classnames(classes.responsive, classes.playPause)}>
                    Design
                    </Typography>
                    <Typography variant='h5' align="center"  component="p"  className={classes.responsiveBody}>
                    Envision your applications as you have dreamed them to be.
                    </Typography>
                    <Button
                    variant="contained"
                    className={classnames(classes.margin, classes.custom)}
                    onClick={handleOpen}>
                      Request a design
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {<Request/>}
                    </Modal>
                </Container>
              </Grid>
            </Grid>
            <Grid item container xs={12} className={classnames(classes.imageStyle, classes.positionTwo, classes.footerImg, classes.responsive)}>
              <Grid item xs={12}>
                Let's build dreams together!
                </Grid>
              <Grid item xs={12}>
                <Typography component="p">
                {'It is '}{date}{' in Addis Ababa, Ethiopia'}<br/>
                {'Contact me any time :)'}<br/>
                </Typography>
                </Grid>
                
            </Grid>
           </Grid>
    </>     
  );
}

export default withRouter(Landing);