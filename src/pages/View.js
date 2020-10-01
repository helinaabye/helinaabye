import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import { AuthContext } from '../contexts/AuthContext';

const View = (props) => {
  const { post_id } = props.match.params;
  const { address } = useContext(ApiContext)
  const { auth, header } = useContext(AuthContext)
  const [ item, setItem ] = useState(null)
  const ownPost = auth.user && item && auth.user.id === item.user_id
  const goBack = () => {
    if (ownPost) props.history.push('/posts')
    else props.history.push('/')
  }
  const deleteItem = (id) => {
    if (ownPost)
      axios.delete(`${address}/users/${auth.user.id}/posts/${id}`, header)
      .then(({data}) => props.history.push('/posts'))
  }
  const editItem = (id) => {
    if (ownPost)
      props.history.push(`/edit/${id}`)
  }
  const readItem = useCallback(() => {
    if (auth.user)
      axios.get(`${address}/users/${auth.user.id}/posts/${post_id}`, header)
      .then(({data}) => setItem(data))
    else
      axios.get(`${address}/posts/${post_id}`)
      .then(({data}) => setItem(data))
  }, [address, header, auth.user, post_id])
  useEffect(() => readItem(), [readItem])
  return (
    <div>
      <div className="container" style={{marginTop: "20px"}}>
        <div className="center-align">
          <div>
            <div className="row valign-wrapper" style={{marginTop: "20px", height: "75px", marginBottom: "0px"}}>
              <div className="col s6 m6">
                <div className="left" >
                  <button 
                    className="btn-floating waves-effect waves-light purple"
                    onClick={goBack}>
                    <i className="material-icons circle right">arrow_back</i>
                  </button>
                </div>
              </div>
              <div className="col s2 m4"></div>
              {ownPost ? <React.Fragment>
                <div className="col s2 m1">
                  <button 
                    className="btn-floating waves-effect waves-light green"
                    onClick={() => editItem(item.id)}>
                    <i className="material-icons white-text">edit</i>
                  </button>
                </div>
                <div className="col s2 m1">
                  <button 
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => deleteItem(item.id)}>
                    <i className="material-icons white-text">delete</i>
                  </button>
                </div>
              </React.Fragment> : <React.Fragment>
                <div className="col s2 m1">
                </div>
                <div className="col s2 m1">
                </div>
              </React.Fragment>}
            </div>
          </div>
          {item ?
          <div>
            <div>
              <h4 className="purple-text">{item.title}</h4>
            </div>
            <div style={{marginTop: '30px'}}>
              <h6>Written by {ownPost ? auth.user.username : item.username}</h6>
            </div>
            <div>
              <h6>{(new Date(item.time)).toLocaleString('en-GB', {
                year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
              })}</h6>
            </div>
            <div className="left-align" style={{marginTop: '40px'}}>
              <p className="flow-text" style={{whiteSpace: "pre-wrap"}}>{item.content}</p>
            </div>
            <div className="divider" style={{marginTop: '30px'}}></div>
          </div>
          : null}
        </div>
      </div>
    </div>
  )
}

export default View;