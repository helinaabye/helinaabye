import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact from="/" component={Home}/>
          <Route path='/projects' component={Projects}/>
          <Route path='/contact' component={Contact}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;