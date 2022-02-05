import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Url, defaultimg } from "../api/api"
import { UserTab } from '../user/user';
import Posts from '../posts/posts';

export default function Header({ Post, setPost, setloadingPost }) {
   const [dropdown, setdropdown] = useState(false);
   const history = useNavigate();
   useEffect(() => {
      axios.get(`${Url}displayPic`).then(res => {
         let posts = [];
         res.data[0].map(elem => {
            posts.push(<Posts id={elem._id} title={elem.title} image={elem.image} about={elem.about} />)
            // posts.push(<Posts />    Posts(elem._id, elem.title, elem.about, elem.image))
         })
         setPost(posts);
         setloadingPost(false);
      }).catch(er => er)
   }, []);

   function Send() {
      const text = document?.getElementById('text').value || "";
      document.getElementById('text').value = "";
      if (text === "") return;
      setloadingPost(true)
         ;
      axios.get(`${Url}displayPic`).then(res => {
         let posts = [];
         res.data[0].map(elem => {
            if (elem.labels.includes(text))
               posts.push(<Posts id={elem._id} title={elem.title} image={elem.image} about={elem.about} />)
         })
         setPost(posts);
         console.log(posts);
         setloadingPost(false);
      }).catch(er => er)
   }
   return <div className='nav'>
      <div className='searchengine'>
         <input type='search' id="text" className="searchengine-input" />
         <SearchIcon style={{ cursor: "pointer", paddint: "5px" }} onClick={() => { Send() }} />
      </div>
      <AccountCircleIcon className="avatar" onClick={() => { setdropdown(!dropdown) }} />
      {!dropdown ? null : <div className='dropdown'>
         <div className="dropdown-field" onClick={() => history('/')}>
            <h3>Home</h3>
         </div>
         <div className="dropdown-field" onClick={() => history('/Mypicture')}>
            <h3>My Picture</h3>
         </div>
         <div className="dropdown-field" onClick={() => history('/upload')}>
            <FileUploadIcon className='icon' />
            <h3>upload picture</h3>
         </div>
         <div className="dropdown-field" onClick={() => { localStorage.removeItem('Token'); localStorage.removeItem('Email'); window.location.reload() }}>
            <LogoutIcon className='icon' />
            <h3>Logout</h3>
         </div>
      </div>}
   </div>;
}
