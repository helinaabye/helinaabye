import React, { createContext } from 'react';

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const address = process.env.NODE_ENV === 'development' ? "http://localhost:3005" : "https://helinaabye.herokuapp.com"
  return (
    <ApiContext.Provider value={{address}}>
      { props.children }
    </ApiContext.Provider>
  )
}

export default ApiContextProvider;