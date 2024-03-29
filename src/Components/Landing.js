import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, CssBaseline, Fab, Grid, Hidden, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {  faEnvelope } from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import Blogsie from '../video/BlogsiePreview.mp4';
import { ReactComponent as App } from '../images/App.svg';
import { ReactComponent as Design } from '../images/Design.svg';
import { ReactComponent as Unique } from '../images/unique.svg';
import { ReactComponent as Customized } from '../images/customized.svg';
import { ReactComponent as Innovative } from '../images/innovative.svg';
import { ReactComponent as Solutions } from '../images/solutions.svg';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { purple } from '@material-ui/core/colors'
import Modal from '@material-ui/core/Modal';
import Request from './Request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MessageIcon from '@material-ui/icons/Message';

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
    borderStyle: "1px solid #fff",
    borderRadius: "50px",
    padding: theme.spacing(2, 3, 2),
  },
  taglineOne: {
    color: '#fff',
    borderStyle: "1px solid #fff",
    borderRadius: "50px",
    marginRight: "90px"
  },
  taglineTwo: {
    backgroundColor: '#fff',
    borderStyle: "1px solid #fff",
    borderRadius: "50px",
    padding: theme.spacing(2, 3, 2),
  },
  taglineThree: {
    color: '#fff',
    borderStyle: "1px solid #fff",
    borderRadius: "50px",
    marginLeft: "90px"
  },
  responsive: {
    fontSize: "2.5rem",
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
    // backgroundImage: 'url(https://unsplash.com/photos/gREi-9tI5Mg/download?force=true&w=1920)',
    backgroundImage: "linear-gradient(to bottom, rgba(75,0,180,0), rgba(75,0,180,0.8))",
    height: "100vh",
    color: "#3f51b5",
    backgroundColor: "#2fa6ee"
  },
  sectionImg: {
    // backgroundImage: 'url(https://unsplash.com/photos/aMPfitH2tT0/download?force=true&w=1920)',
    backgroundImage: "linear-gradient(to top, rgba(75,0,180,0), rgba(75,0,180,0.8))",
    height: "800px",
    backgroundColor: "rgba(160, 43, 197, 1)"
  },
  footerImg: {
    // backgroundImage: 'url(https://unsplash.com/photos/Xaanw0s0pMk/download?force=true&w=1920)',
    backgroundImage: "linear-gradient(to bottom, rgba(75,0,180,0), rgba(75,0,180,0.8))",
    height: "50vh",
    color: "#fff",
    backgroundColor: "rgba(160, 43, 197, 1)"
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
  positionThree: {
    display: "inline",
  },
  padding: {
    padding: theme.spacing(6, 0, 6),
  },
  paddingTwo: {
    padding: theme.spacing(6, 0, 0),
  },
  paddingThree: {
    padding: theme.spacing(4, 0, 0),
  },
  margin: {
    margin: theme.spacing(2, 0, 1),
  },
  custom: {
    color: '#fff',
    backgroundColor: purple[600],
    "&:hover": {
      color: "#fff",
      backgroundColor: '#6a1b9a',
    },
  },
  customTwo: {
    color: '#fff',
    backgroundColor: "#4a148c",
    "&:hover": {
      color: "#fff",
      backgroundColor: '#6a1b9a',
    },
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
    padding: theme.spacing(2, 2, 3),
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  link: {
    color: '#fff'
  },
  modal: {
    padding: "20px"
  }, 
  fab: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    backgroundColor: "#fff",
    color: "#3f51b5",    
    "&:hover": {
      color: "white !important",
      backgroundColor: "#1976d2"
    }
  },
  svg: {
    maxWidth: "250px",
    maxHeight: "200px"
  },
  svgTwo: {
    maxWidth: "100px",
    maxHeight: "50px"
  },
  magnify: {
    "&:hover": { 
      transition: theme.transitions.create(["width", "height"], {
      duration: 200
          }),
      fontSize: "1.5rem !important"
    },
    }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Landing = ({history}) => {
  const classes = useStyles();
  const [overlay, setOverlay] = useState(null)
  const vidRef = useRef(null);
  const [date, setDate] = useState(null)  
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("contact");
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleOpen = (request) => {
    setOpen(true);
    setType(request);
  };

  const handleClose = () => {
    setOpen(false);
    setType("contact");
  };


  useEffect(() => {
    setInterval(
        () => setDate(new Date().toLocaleString("en-US", {timeZone: "Africa/Kampala"})),
        1000
      );
}, [])

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
             <Grid item container xs={12} className={classnames(classes.imageStyle, classes.position, classes.headerImg)}>
              <Hidden mdUp> 
             <Grid item container xs={6} spacing={1} className={classnames(classes.position, classes.paddingThree)}>
              <Grid item xs={12} md={6} className={classes.taglineOne}>
                <Unique className={classes.svgTwo}/>
                <Typography className={classes.magnify} >UNIQUE</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} className={classes.taglineThree}>
                <Customized className={classes.svgTwo}/>
                <Typography className={classes.magnify} >CUSTOMIZED</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item  xs={12} md={6} className={classes.taglineOne}>
                <Innovative className={classes.svgTwo}/>
                <Typography className={classes.magnify} >INNOVATIVE</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} className={classes.taglineThree}>
                <Solutions className={classes.svgTwo}/>
                <Typography className={classes.magnify} >SOLUTIONS</Typography>
                </Grid>
                </Grid>
              </Hidden>
               
              <Hidden smDown> 
              
             <Grid item container xs={6} spacing={1} className={classnames(classes.position, classes.paddingTwo)}>
              <Grid item xs={12} md={6} className={classes.tagline}>
                <Unique className={classes.svgTwo}/>
                <Typography className={classes.magnify}>UNIQUE</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} className={classes.taglineTwo}>
                <Customized className={classes.svgTwo}/>
                <Typography className={classes.magnify}>CUSTOMIZED</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item  xs={12} md={6} className={classes.tagline}>
                <Innovative className={classes.svgTwo}/>
                <Typography className={classes.magnify}>INNOVATIVE</Typography>
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} >
              </Grid>
              <Grid item xs={12} md={6} className={classes.taglineTwo}>
                <Solutions className={classes.svgTwo}/>
                <Typography className={classes.magnify}>SOLUTIONS</Typography>
                </Grid>
                </Grid>
              </Hidden>

             
              {/* <div className={classnames(classes.imageStyle, classes.position, classes.headerImg)}>
                  <Typography className={classnames(classes.tagline, classes.responsive)} >
                    UNIQUE, 
                    CUSTOMIZED,
                    INNOVATIVE  <br/>
                    SOLUTIONS
                  </Typography>
                </div> */}
                </Grid>
            <Grid item container xs={12} className={classnames(classes.padding, classes.position)}>
              <Grid item container xs={8} md={5} className={classes.position} >
                <App className={classes.svg}/>
              </Grid>
              <Grid item container  xs={10} md={6} className={classes.position}>
                <Container maxWidth="sm" component="main" >
                    <Typography align="center" color="primary" gutterBottom className={classes.responsive}>
                    Web App
                    </Typography>
                    <Typography align="center" component="p"  className={classes.responsiveBody}>
                    Get a web application or site built to realize your goals.
                    </Typography>
                    <Button
                    variant="contained"
                    color="primary" 
                    className={classes.margin}
                    onClick={() => handleOpen("build")}>
                      Request a web app
                    </Button>
                    <Modal 
                      open={open}
                      onClose={() => handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {<><Request type={type} handleClose={handleClose} handleClick={handleClick}/></>}
                    </Modal>
                    <Snackbar 
                    open={openAlert} 
                    autoHideDuration={6000} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleCloseAlert}>
                      <Alert onClose={handleCloseAlert} severity="success" color="info">
                        Thank you, your request has been submitted!
                      </Alert>
                    </Snackbar>                    
                    <Fab color="primary" aria-label="message" className={classes.fab} onClick={() => handleOpen("contact")}>
                      <MessageIcon />
                    </Fab>
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
                    Blgosie is a simple blog site where you can create, draft and publish posts.
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
            <Grid item container xs={8} md={5} className={classes.position}>
                <Design className={classes.svg}/>
              </Grid>
              <Grid item xs={10} md={5} className={classes.position}>
                <Container maxWidth="sm" component="main" >
                    <Typography align="center" gutterBottom className={classnames(classes.responsive, classes.playPause)}>
                    Design
                    </Typography>
                    <Typography variant='h5' align="center"  component="p"  className={classes.responsiveBody}>
                    Envision your applications as you dream them to be.
                    </Typography>
                    <Button
                    variant="contained"
                    className={classnames(classes.margin, classes.custom)}
                    onClick={() => handleOpen("design")}>
                      Request a design
                    </Button>
                </Container>
              </Grid>
              
              
            </Grid>
            <Grid item container xs={12} className={classnames(classes.imageStyle, classes.position, classes.footerImg, classes.responsive)}>
              <Grid item xs={12} className={classes.positionThree}>
                Let's build dreams together!
                <Typography component="p">
                {'It is '}{date}{' in Addis Ababa, Ethiopia'}<br/>
                <Link className={classes.link} 
                    onClick={() => handleOpen("contact")}>
                {'Contact me '}{<FontAwesomeIcon icon={faEnvelope} size="1x"  color="#fff"/>}{' any time :)'}
                </Link> 
                </Typography>
                <Button variant="contained" className={classes.customTwo}
                  onClick={() => {history.push('/profile')}}>
                  View Profile
                </Button>
                </Grid>                
            </Grid>
           </Grid>
    </>     
  );
}

export default withRouter(Landing);