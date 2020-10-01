import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import { AuthContext } from '../contexts/AuthContext';

const Posts = (props) => {
  const { address } = useContext(ApiContext)
  const { auth, header } = useContext(AuthContext)
  const [ items, setItems ] = useState([])
  const readItems = useCallback(() => {
    axios.get(`${address}/users/${auth.user.id}/posts`, header)
    .then(({data}) => setItems(data))
  }, [address, header, auth.user.id])
  useEffect(() => readItems(), [readItems])
  return (
    <div>
      <div className="container" style={{marginTop: "20px"}}>
        <div className="center-align">
          <div className="row valign-wrapper" style={{marginTop: "20px", marginBottom: "0px"}}>
            <div className="left">
              <h4 className="col s12 m6">Posts</h4>
            </div>
            <div className="col s12 m6">
              <div className="right" >
                <button 
                  className="btn-floating waves-effect waves-light purple"
                  onClick={() => props.history.push('/add')}>
                  <i className="material-icons circle right">add</i>
                </button>
              </div>
            </div>
          </div>
          <div className="section">
            {items.map((item, index) => 
              <div className="container" key={item.id} onClick={e => props.history.push(`/view/${item.id}`)}>
                <div style={{marginTop: '20px'}}>
                  <h4 className="purple-text">{item.title}</h4>
                </div>
                <div style={{marginTop: '20px'}}>
                  <h6>Written by {auth.user.username} ({item.public ? 'public' : 'private'})</h6>
                </div>
                <div>
                  <h6>{(new Date(item.time)).toLocaleString('en-GB', {
                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                  })}</h6>
                </div>
                <div style={{marginTop: '20px'}}>
                  <p className="flow-text truncate">{item.content}</p>
                </div>
              {index < items.length - 1 ?
                <div className="divider" style={{marginTop: '40px'}}></div>
              : null}
              </div>
            )}
            {/* <div>
                <div className="btn-floating btn-small z-depth-3" style={{border: '1px', marginRight: "20px"}} 
                onClick={() => config.updateItem(item.id)}>
                <i className="material-icons yellow darken-2">edit</i>
                </div>
                <div className="btn-floating btn-small z-depth-3" 
                onClick={() => config.deleteItem(item.id)}>
                <i className="material-icons red darken-2">delete</i>
                </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts;