import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Url } from '../api/api';
import Header from '../header/header';
import "./details.css"
import Spinner from "../spinner/spinner"

export default function Details() {
   const [commentloading, setcommentloading] = useState(false);
   const [loading, setloading] = useState(true);
   const [picture, setpicture] = useState({});
   const [user, setuser] = useState("");
   function Send() {
      const comment = document?.getElementById('comment').value || "";
      if (comment === "") return;
      setcommentloading(true);
      document.getElementById('comment').value = "";
      let commentarr = [...picture.comments];
      const loc = window.location.pathname.split('/');
      const id = loc[2];
      commentarr.push({ 'comment': comment, 'id': localStorage.getItem('Username') })
      let data = {
         id: id,
         comment: commentarr
      }

      axios.post(`${Url}addcomment`, data).then(res => {
         console.log(res);
      }).catch(err => err);

   }
   useEffect(() => {
      const loc = window.location.pathname.split('/');
      const id = loc[2];
      axios.get(`${Url}displaypic`).then(res => {
         res.data[0].map(elem => {
            if (elem._id.toString() === id.toString()) {
               setpicture(elem);
               if (commentloading) {
                  setcommentloading(false);
               }
               axios.get(`${Url}displayuser`).then(result => {
                  result.data.map(i => {
                     if (i._id === elem.postBy) {
                        setuser(i);
                     }
                  })
               }).catch(err => err);
            }
         })
         setloading(false);
      }).catch(err => err);
   }, [picture, setpicture]);

   return <div className='details'>
      {loading ? <Spinner /> : <div className='details-body'>
         <img className='detail-image' src={`data:image/png;base64,${picture.image}`} alt="pin" />
         <div className='details-info'>
            <h1>{picture?.title}</h1>
            <h4>{picture?.about}</h4>
            <div className='labels'>
               {picture?.labels?.map(elem => elem === "" ? null : <p>{elem}</p>)}
            </div>
            <p>Posted By-<strong>{user?.userName}</strong></p>
            <div className='commentsect'>
               <h4 className='h4'>Comment Down</h4>
               <div className='commentinput'>
                  <input type="text" id="comment" placeholder="Type your comment" />
                  <div className='btn' onClick={() => { Send() }}>{commentloading ? '...Loading' : 'Send'}</div>
               </div>
               <div className='commentdisplay'>
                  {
                     picture.comments.map(elem => <div className='comment'>
                        <div className='user'>{elem.id}</div>
                        <div className='comments'>{elem.comment}</div>
                     </div>)
                  }
               </div>
            </div>
         </div>
      </div>
      }
   </div >;
}
