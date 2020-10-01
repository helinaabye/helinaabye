import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import { AuthContext } from '../contexts/AuthContext';
import M from "materialize-css";

const Add = (props) => {
  const { address } = useContext(ApiContext)
  const { auth, header } = useContext(AuthContext)
  const [ item, setItem ] = useState({time: Date.now()})
  const submit = () => {
    if (item.title && item.content && item.time)
      axios.post(`${address}/users/${auth.user.id}/posts`, item, header)
      .then(({data}) => {
        if (data) props.history.push('/posts')
      })
  }
  useEffect(() => {
    M.CharacterCounter.init(document.querySelectorAll('input#title'));
  })
  return (
    <div className="container">
      <div className="row valign-wrapper" style={{marginTop: "20px"}}>
        <h4 className="col s12 m6">Add Post</h4>
        <div className="col s12 m6">
          <div className="right" >
            <button 
              className="btn-floating waves-effect waves-light purple"
              onClick={() => props.history.push('/posts')}>
              <i className="material-icons circle right">close</i>
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={(e) => submit(e.preventDefault())}>
        <div className="row">
          <div className="input-field col s12 m8 l6">
            <input type="text"
              id="title" data-length="50"
              onChange={(e) => setItem({ ...item, title: e.target.value })} />
            <label htmlFor="title">title</label>
          </div>
          <div className="input-field col s12">
            <textarea type="text"
              id="content" className="materialize-textarea"
              style={{height: "35vmin", overflowY: "auto"}} 
              onChange={(e) => setItem({ ...item, content: e.target.value })}></textarea> 
            <label htmlFor="content">content</label>
          </div>
        </div>
        <div className="row">
            <div className="col s6 m8">
              <div className="input-field">
                <label style={{position: 'relative'}} >
                  <input type='checkbox' id="publish" 
                    onChange={(e) => setItem({ ...item, public: e.target.checked })} />
                  <span>publish (mak post public)</span>
                </label>
              </div>
            </div>
            <div className="col s6 m4">
              <div className="right">
                <button className="btn waves-effect waves-light purple" type="submit" name="action">Add
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
      </form>
    </div>
  )
}

export default Add;