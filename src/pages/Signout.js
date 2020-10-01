import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Signout = (props) => {
  const { auth, dispatch } = useContext(AuthContext)
  const signout = () => {
    dispatch({type: 'SIGN_OUT'})
    props.history.push('/')
  }
  return (
    <div className="container">
      <h1>Sign out</h1>
      <h4>You are signed in as {auth.user.username}, click below to sign out.</h4> 
      <button
        className="btn waves-effect waves-light purple"
        onClick={signout}>
        Sign Out
        <i className="material-icons right">send</i>
      </button>
    </div>
  )
}

export default Signout;