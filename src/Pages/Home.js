import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Landing from '../Components/Landing';

const Home = () => {

  return (
    <>
      <CssBaseline />
      <Header/>
      <Landing/>
      <Footer/>
    </>
  );
}

export default Home;