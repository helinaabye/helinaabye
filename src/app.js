import React, { useEffect, useState, useCallback } from 'react';import {
  // faYoutube,
  // faFacebook,
  faTwitter,
  faGithub,
  faMedium 
  // faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Typography, Link, Hidden } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { list } from './imgList'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import 'materialize-css/dist/css/materialize.min.css';
// import M from "materialize-css";
// import Navbar from './pages/Navbar';
// import Home from './pages/Home';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import Signout from './pages/Signout';
// import Posts from './pages/Posts';
// import View from './pages/View';
// import Add from './pages/Add';
// import Edit from './pages/Edit';
// import AuthContextProvider from './contexts/AuthContext';
// import ApiContextProvider from './contexts/ApiContext';
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
  }
}));

function App() {
  // useEffect(() => M.AutoInit(), []);
  const [date, setDate] = useState(null)
  const [tick, setTick] = useState(null)
  const [index, setIndex] = useState(0)
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

  const getDate = useCallback(
    () => {
      setDate(new Date().toLocaleString("en-US", {timeZone: "Africa/Kampala"}))
      setInterval(
          () => setTick(tick + 1),
          1000
        );
    },
    [tick],
  )

useEffect(() => {
  getDate()
 }, [getDate, tick])

  return (
    <div className="App">
    <header className="App-header">
      <Grid item container md={10} >
        <Grid item container sm={12} md={6}>
          <Grid item container className={classes.content} xs={12}>
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
                <img src={imgList[index]} width="500px" alt="chibird motivation card"/>
              </Hidden>
            </Grid>
            <Grid item xs={2}>
              <IconButton 
              className={classes.arrowIcon}
              onClick={() => handleChangeImg("next")}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item container   className={classes.content} xs={12}>
            <Typography  variant="caption">
              Awesome motivational art from <Link className={classes.link} href="https://chibird.com/">Chibird</Link>!
            </Typography>
          </Grid>       
        </Grid>
        <Grid item container sm={12} md={6}  className={classes.content}>
          <div> 
            <p>
              Hello! I am Helina, a Software Developer.
            </p> 
            <Grid item container className={classes.content}>
            <a href="https://www.twitter.com/helinaabye_" className="twitter social">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
            <a href="https://github.com/helinaabye"
              className="github social">
              <FontAwesomeIcon icon={faGithub} size="1x" />
            </a>
            <a href="https://medium.com/@helinaabye"
              className="github social">
              <FontAwesomeIcon icon={faMedium} size="1x" />
            </a>
           </Grid>
           <p>
            The current date and time in Ethiopia is
           </p>  
            {date}
           <p>“Don't count the days. Make the days count.”<br/> Muhammad Ali</p>
          </div>
        </Grid>
      </Grid>
     
      {/* <ApiContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <div >
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/signout' component={Signout} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/add' component={Add} />
              <Route exact path='/view/:post_id' component={View} />
              <Route exact path='/edit/:post_id' component={Edit} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
      </ApiContextProvider> */}
      </header>
    </div>
  );
}

export default App;
