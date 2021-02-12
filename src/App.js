import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Profile from './Pages/Profile';
import ApiContextProvider from './contexts/ApiContext';


function App() {
  return (
    <div className="App">
      <ApiContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact from="/" component={Home}/>
          <Route path='/projects' component={Projects}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </BrowserRouter>
      </ApiContextProvider>
    </div>
  );
}

export default App;