import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "./login.css"
import { Url } from "../api/api"
import { useNavigate } from "react-router-dom";

export default function Login() {
   const [message, setmessage] = useState("");
   const [islogin, setislogin] = useState(false)
   const [Image, setImage] = useState(null);
   const [loading, setloading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
   }, [islogin, message]);
   function upload(e) {
      setImage(e.target.files[0]);
   }

   function Getelem() {
      let name = document?.getElementById('name')?.value || "";
      let email = document?.getElementById('email')?.value || "";
      let password = document?.getElementById('password')?.value || "";
      let conpassword = document?.getElementById('conpassword')?.value || "";
      return { name, email, password, conpassword };
   }
   function validate() {
      const { name, email, password, conpassword } = Getelem();
      if (email === "" || password === "") return "Fill All The Fields";
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
         return "Incorrect Email";
      }
      if (!islogin && (name === "" || conpassword === "")) {
         return "Fill up all the Fields";
      }
      if (!islogin && conpassword !== password) {
         return "Password Doesn't Match"
      }
      if (password.length <= 4)
         return "Password is weak";

      return "OK";
   }

   function onLogin() {
      setloading(true);
      const { name, email, password, conpassword } = Getelem();
      let msg = validate();
      if (msg !== "OK") {
         setmessage(msg);
         return;
      }
      const data = {
         email: email, password: password,
      }
      axios.post(`${Url}login`, data).then(res => {
         setmessage(res.data.msg);
         console.log(res.data, res.data.code);
         if (res.data.code === 1) {
            localStorage.setItem("Token", res.data.data.id);
            localStorage.setItem("Username", res.data.data.Username);
            localStorage.setItem("Email", res.data.data.email);
            window.location.reload();
         }
         else { navigate('/') }
         setloading(false);

      }).catch(err => console.log(err));
   }
   function onRegister() {
      setloading(true);

      const { name, email, password, conpassword } = Getelem();
      let msg = validate();
      if (msg !== "OK") {
         setmessage(msg);
         return;
      }
      var formdataobj = new FormData();
      formdataobj.append("name", name)
      formdataobj.append("email", email)
      formdataobj.append("password", password)
      formdataobj.append("image", Image)
      axios.post(`${Url}addUser`, formdataobj).then(res => {
         setmessage(res.data.msg);
         if (res.data.code == 1) {
            setislogin(true);
         }
         setloading(false);

      }).catch(err => console.log(err));

   }
   return (
      <div className='login' >
         <div className="login-div">
            {!islogin ? < div className='field'>
               <label>Name:</label>
               <input id="name" type='text' placeholder='Enter your name' ></input>
            </div> : null}
            <div className='field'>
               <label>Email:</label>
               <input id="email" type='email' placeholder='Enter your email'></input>
            </div>
            {!islogin ? < div className='field'>
               <label>Upload Image:</label>
               <input onChange={(e) => upload(e)} id="image" type="file" name="myImage" accept="image/*" />
            </div> : null}
            <div className='field'>
               <label>Password:</label>
               <input id="password" type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Enter password'></input>
            </div>
            {!islogin ? < div className='field'>
               <label>Confirm Password:</label>
               <input id="conpassword" type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Reenter password' ></input>
            </div> : null}
            <div className='msg'>{message}</div>
            <button onClick={() => islogin ? onLogin() : onRegister()}>{loading ? '...Loading' : islogin ? 'Login' : 'Register'}</button>
            <div className='switch' onClick={() => setislogin(!islogin)}>{islogin ? `Don't have an account?` : `already have an account?`}</div>
         </div>
      </div >);
}
