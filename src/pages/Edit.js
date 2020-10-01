import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { ApiContext } from '../contexts/ApiContext';
import { AuthContext } from '../contexts/AuthContext';
import M from "materialize-css";

const Edit = (props) => {  
  const contentElement = useRef();
  const { post_id } = props.match.params;
  const { address } = useContext(ApiContext)
  const { auth, header } = useContext(AuthContext)
  const [ item, setItem ] = useState(null)
  const save = () => {
    if (item.title && item.content)
      axios.put(`${address}/users/${auth.user.id}/posts/${post_id}`, {...item, time: Date.now()}, header)
  }
  const submit = () => {
    if (item.title && item.content)
      axios.put(`${address}/users/${auth.user.id}/posts/${post_id}`, {...item, time: Date.now()}, header)
      .then(({data}) => {
        if (data) props.history.push('/posts')
      })
  }
  const readItem = useCallback(() => {
    axios.get(`${address}/users/${auth.user.id}/posts/${post_id}`, header)
    .then(({data}) => setItem(data))
  }, [address, header, auth.user.id, post_id])
  useEffect(() => readItem(), [readItem])
  useEffect(() => {if (contentElement) { M.textareaAutoResize(contentElement)}; console.log(contentElement);})
  useEffect(() => {
    M.CharacterCounter.init(document.querySelectorAll('input#title'));
  })

  // window.addEventListener("keydown", function (event) {
  //   if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
  //   console.log("Ctrl-S pressed");
  //   event.preventDefault();
  //   return false;
  // });

  return (
    <div className="container">
      <div className="row valign-wrapper" style={{marginTop: "20px"}}>
        <h4 className="col s8 m10">Edit Post</h4>
        <div className="col s2 m1">
          <div className="right">
            <button
              className="btn-floating waves-effect waves-light green"
              onClick={(e) => save(e.preventDefault())}
              type="save" name="action">
              <i className="material-icons right">save</i>
            </button>
          </div>
        </div>
        <div className="col s2 m1">
          <div className="right" >
            <button 
              className="btn-floating waves-effect waves-light red"
              onClick={() => props.history.push(`/view/${post_id}`)}>
              <i className="material-icons circle right">close</i>
            </button>
          </div>
        </div>
      </div>
      {item ?
        <form onSubmit={(e) => submit(e.preventDefault())}>
          <div className="row">
            <div className="input-field col s12 m8 l6">
              <input type="text" data-length="50"
                id="title" value={item.title}
                onChange={(e) => setItem({ ...item, title: e.target.value })} />
              <label className="active" htmlFor="title">title</label>
            </div>
            <div className="input-field col s12">
              <div className="input-field">
                <textarea  id="content" className="materialize-textarea" value={item.content} ref={contentElement} 
                style={{height: "35vmin", overflowY: "auto"}} 
                onChange={(e) => setItem({ ...item, content: e.target.value })}></textarea> 
                <label className="active" htmlFor="content">content</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s6 m8">
              <div className="input-field">
                <label style={{position: 'relative'}} >
                  <input type='checkbox' id="publish"
                    onChange={(e) => setItem({ ...item, public: e.target.checked })} />
                  <span>publish (make post public)</span>
                </label>
              </div>
            </div>
            <div className="col s6 m4">
              <div className="right">
                <button
                  className="btn waves-effect waves-light purple" 
                  type="submit" name="action">
                  Done
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </form>
      : null}
    </div>
  )
}

export default Edit;