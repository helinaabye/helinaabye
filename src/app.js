import React, { useEffect, useState, useCallback } from 'react';import {
  // faYoutube,
  // faFacebook,
  faTwitter,
  faGithub
  // faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

function App() {
  // useEffect(() => M.AutoInit(), []);
  const [date, setDate] = useState(null)
  const [tick, setTick] = useState(null)
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
       <p>
       Hello! I am Helina, a Software Developer.
        </p> 
       <div class="social-container">
       <a href="https://www.twitter.com/helinaabye_" className="twitter social">
          <FontAwesomeIcon icon={faTwitter} size="1.5x" />
        </a>
        <a href="https://github.com/helinaabye"
          className="github social">
          <FontAwesomeIcon icon={faGithub} size="1.5x" />
        </a>
       </div>
       <p>
       The current date and time in Ethiopia is
        </p> 
       {date}
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
