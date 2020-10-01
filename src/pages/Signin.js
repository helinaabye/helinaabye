import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import { AuthContext } from '../contexts/AuthContext';

const Signin = (props) => {
  const { address } = useContext(ApiContext)
  const { dispatch } = useContext(AuthContext)
  const [ inputs, setInputs ] = useState({})
  const submit = () => {
    if (inputs.username && inputs.password)
      axios.get(`${address}/users?${new URLSearchParams(inputs).toString()}`)
      .then(({data}) => {
        if (data.results.length === 1) {
          dispatch({type: "SIGN_IN", user: data.results[0], token: data.token})
          props.history.push('/posts')
        }
      })
  }
  return (
    <div className="container">
      <div className="row valign-wrapper" style={{marginTop: "20px"}}>
        <h4 className="col s12 m6">Sign In</h4>
        <div className="col s12 m6">
          <div className="right" >
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <form onSubmit={(e) => submit(e.preventDefault())}>
        <div className="input-field">
          <input type="text"
            id="username" 
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
          <label htmlFor="username">username</label>
        </div>
        <div className="input-field">
          <input type="password"
            id="password" 
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          <label htmlFor="password">password</label>
        </div>
        <button className="btn waves-effect waves-light purple" type="submit" name="action">submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default Signin;