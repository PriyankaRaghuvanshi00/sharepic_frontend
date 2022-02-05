import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import { Navigate, Route, Routes } from 'react-router';
import Login from './components/login/login';
import { useEffect, useState } from 'react';
import Upload from './components/upload/upload';
import Mypic from './components/mypic/mypic';
import Details from './components/details/details';
import Header from './components/header/header';

function App() {
  const [head, sethead] = useState(false);
  const [islogin, setislogin] = useState(localStorage.getItem("Token"));
  const [Post, setPost] = useState([]);
  const [loadingPost, setloadingPost] = useState(true);
  useEffect(() => {
    let loc = window.location.pathname.split('/')[1];
    if (loc === "upload" || !localStorage.getItem('Token'))
      sethead(true)
    setislogin(localStorage.getItem("Token"))
  }, [localStorage.getItem("Token"), setPost, setloadingPost]);

  return (
    <div className='app'>
      {head ? null : <Header Post={Post} setPost={setPost} setloadingPost={setloadingPost} />}
      <Routes>
        <Route path="/" element={islogin ? <Home setPost={setPost} Post={Post} setloadingPost={setloadingPost} loadingPost={loadingPost} /> : <Login />}></Route>
        <Route path="/home" element={islogin ? <Home setPost={setPost} Post={Post} setloadingPost={setloadingPost} loadingPost={loadingPost} /> : <Navigate to="/" />}></Route>
        <Route path="/upload" element={islogin ? <Upload /> : <Navigate to="/" />}></Route>
        <Route path="/Mypicture" element={islogin ? <Mypic /> : <Navigate to="/" />}></Route>
        <Route path="/details/:id" element={islogin ? <Details /> : <Navigate to="/" />}></Route>
      </Routes >
    </div>
  );
}

export default App;
