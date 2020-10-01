import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { ApiContext } from '../contexts/ApiContext';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const { address } = useContext(ApiContext)
  const [ auth, dispatch ] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem('auth')
    return localData ? JSON.parse(localData) : {};
  })
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [auth])
  const header = {headers: auth.token ? {Authorization: `Bearer ${auth.token}`} : {}}
  useEffect(() => {
    if (auth.user)
      axios.post(`${address}/users/${auth.user.id}/token`, {token: auth.token}, header)
      .catch((err) => dispatch({type: 'SIGN_OUT'}))
  }, [address, header, dispatch, auth.user, auth.token])
  return (
    <AuthContext.Provider value={{auth, dispatch, header}}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;