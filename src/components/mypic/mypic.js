import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Url } from "../api/api"
import Posts from '../posts/posts';
import Spinner from '../spinner/spinner';
import "./mypic.css"
import Header from "../header/header"
import { defaultimg } from '../api/api';
import { useNavigate } from 'react-router';
export default function Mypic() {
   const [url, seturl] = useState(defaultimg);
   const [mypictures, setmypictures] = useState([]);
   const [loading, setloading] = useState(false);
   const history = useNavigate();

   useEffect(() => {
      const id = localStorage.getItem('Token')
      setloading(true)
      axios.get(`${Url}displaypic`).then(res => {
         let data = res.data[0];
         let mypost = [];
         data.map(elem => {
            if (elem.postBy.toString() == id.toString()) {
               mypost.push(elem);
            }
         })
         console.log("<", mypost);
         setmypictures(mypost);
      })
      setloading(false)
   }, []);

   useEffect(() => {
      axios.get(`${Url}displayuser`).then(result => {
         result.data.map(elem => {
            if (elem._id.toString() === localStorage.getItem('Token').toString()) {
               if (elem.image !== "")
                  seturl(elem.image);
            }
         })
      })
   }, [url]);

   return (<div className='mypic'>
      <div className='user-board'>
         <div className='user-info'>
            <div className='user-textarea'>
               <h2>{localStorage.getItem('Username')}</h2>
               <p>{localStorage.getItem('Email')}</p>
            </div>
            <img className='user-avatar' alt="dp" src={`data:image/png;base64,${url}`}></img>
         </div>
         <div className='buttons'>
            <button className='user-button' onClick={() => { history('/upload') }}>Upload Picture</button>
            <button className='user-button' onClick={() => { localStorage.removeItem('Token'); window.location.reload() }}>Logout</button>
         </div>
      </div>
      {loading ? <Spinner /> : <div className='board'>
         <div className=' mypin_container'>
            {!loading && mypictures.length === 0 ? <p className='else'>No Posts!</p> : mypictures.map(elem => <Posts id={elem._id} title={elem.title} image={elem.image} about={elem.about} />)}
         </div>
      </div>}
   </div>
   );
}
