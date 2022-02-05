import "./posts.css"
import React from 'react';
import { useNavigate } from "react-router";

export default function Posts({ id, title, about, image }) {
   const history = useNavigate();
   return (
      <div className="pin" onClick={() => { history(`/details/${id}`) }}>
         <div className="pin__container">
            <img src={`data:image/png;base64,${image}`} alt="pin" />
         </div>
      </div>
   );
}
