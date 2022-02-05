import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./home.css"
import { Url, defaultimg } from "../api/api"
import Spinner from '../spinner/spinner';
import { useNavigate } from 'react-router';
import Posts from '../posts/posts';
import Header from '../header/header';
import { UserTab } from '../user/user';

export default function Home({ Post, setPost, setloadingPost, loadingPost }) {

   const [users, setusers] = useState([]);
   const [loadingUsers, setloadingUsers] = useState(true);

   useEffect(() => {
      axios.get(`${Url}displayUser`).then(res => {
         let user = [];
         res.data.map(elem => {
            console.log(elem);
            if (elem._id !== localStorage.getItem('Token'))
               if (elem.image == "")
                  user.push(UserTab(elem._id, defaultimg, elem.userName))
               else
                  user.push(UserTab(elem._id, elem.image, elem.userName))
         })
         setusers(user)
         setloadingUsers(false);
      }).catch(er => er);;

   }, [])


   return (
      <div className="home">
         <div className='sidebar'>
            {loadingUsers ? <Spinner /> : users.length == 0 ? <p>No other user available</p> : users.map(elem => elem)}</div>
         <div className="body">
            {/* <Header /> */}
            <div className='feed-images'>
               {loadingPost ? <Spinner /> : <div className="pin_container">
                  {Post.length == 0 ? <p>No Picture uploaded !</p> : Post.map(elem => elem)}
               </div>}
            </div>
         </div>
      </div>
   );
}

