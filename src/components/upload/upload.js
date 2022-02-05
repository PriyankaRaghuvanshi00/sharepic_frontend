import "./upload.css"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Url } from "../api/api";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function Upload() {
   const [Image, setImage] = useState(null);
   const [message, setmessage] = useState("");
   const navigate = useNavigate();
   const [loading, setloading] = useState(false);
   const [labels, setlabels] = useState([]);
   const [elemlabels, setelemlabels] = useState([]);
   useEffect(() => {
   }, [Image, message, setlabels, setelemlabels]);
   function Getelem() {
      let title = document?.getElementById('title')?.value || "";
      let about = document?.getElementById('about')?.value || "";
      return { title, about };
   }
   function upload(e) {
      setImage(e.target.files[0]);
   }
   function validate() {
      const { title, about } = Getelem();
      if (title === "" || about === "") return "Fill All The Fields";
      return "";
   }
   function Labels() {
      let label = document?.getElementById('label')?.value || "";
      if (label === "") return;
      let temp = [...labels], temp1 = [...elemlabels];
      temp1.push(label)
      temp.push(<p>{label}</p>);
      setlabels(temp);
      setelemlabels(temp1);
      console.log(elemlabels);
      // document.getElementById('labelscontainer').innerHTML = `${labels}`
      document.getElementById('label').value = ""
   }
   function Clear() {
      let temp = elemlabels, temp1 = labels;
      temp.pop();
      temp1.pop();
      setelemlabels(temp);
      setlabels(temp1)
      // document.getElementById('labelscontainer').innerHTML = `${labels}`
   }
   function OnClick() {
      setloading(true);
      const { title, about } = Getelem();
      let msg = validate();
      setmessage(msg);
      var formdataobj = new FormData();
      formdataobj.append("title", title)
      formdataobj.append("about", about)
      formdataobj.append("postBy", localStorage.getItem('Token'))
      formdataobj.append("labels", elemlabels)
      formdataobj.append("image", Image)
      axios.post(`${Url}addpic`, formdataobj).then(res => {
         setmessage(res.data.msg)
         console.log(res.data.msg);
         setloading(false);
         if (res.data.code == 1) {
            navigate('/home');
         }
      })
         .catch(er => er);
   }
   return <div className="upload">
      <div className='upload-div'>
         <h2>Add Picture</h2>
         <div className="field">
            <label>Title:</label>
            <input type="text" id="title" placeholder="Enter title" />
         </div>
         <div className="field">
            <label>About:</label>
            <input type="text" id="about" placeholder="Enter title" />
         </div>
         <div className="field label-display" id="labelscontainer">{
            labels.map(elem => elem)
         }
         </div>
         <div className="field">
            <label>Labels:</label>
            <div className="label-input">
               <input type="text" id="label" placeholder="Enter Label" />
               <CheckIcon className="icon" onClick={() => Labels()} />
               <ClearIcon className="icon" onClick={() => Clear()} />
            </div>
         </div>
         <div className='field'>
            <label>Upload Image:</label>
            <input onChange={(e) => upload(e)} id="image" type="file" name="myImage" accept="image/*" />
         </div>
         <div className='msg'>{message}</div>
         <button onClick={() => { OnClick() }}>{loading ? '...Uploading' : 'Add Picture'}</button>
      </div >
   </div>
}
