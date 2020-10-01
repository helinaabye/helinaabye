import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import M from "materialize-css";
import cristals from "../images/cristals.png";

const Home = (props) => {
  // const { address } = useContext(ApiContext)
  // const [ items, setItems ] = useState([])
  // const readItems = useCallback(() => {
  //   axios.get(`${address}/posts`)
  //   .then(({data}) => setItems(data))
  // }, [address])
  // useEffect(() => readItems(), [readItems])
  useEffect(() => {
    M.Parallax.init(document.querySelectorAll('.parallax'));
  })
  return (
    <div>
      <div className="parallax-container">
          <div className="parallax center">
              <img src={cristals} alt="" className="responsive-img"/>
              <div className="white-text" style={{zIndex: "2", position: "absolute", top: "100px", left: "250px", fontWeight: "bold"}}><h2>Software Developer</h2></div>
          </div>
      </div>
    </div>
  )
}

export default Home;