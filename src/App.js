import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';

import './styles/App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './state/user/user';
import Home from './components/Home';
import { verifyToken } from './state/guests/verifyToken';

function App() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const verifiedToken = useSelector(state => state.verifiedToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // este useEffect probablemente ya no sea necesario
  // useEffect(() => {
  //   if (verifiedToken) {
  //     dispatch(verifyToken());
  //     navigate('/register');
  //   }
  // }, [verifiedToken]);

  useEffect(() => {
    dispatch(checkUser());
  }, [user.id]);
  return (
    <>
      <Navbar />
      <Countdown />
      <Routes>
        {/* confirm access-Public */}
        <Route exact path="/login" element={user.id && <Login />} />
        {/* register- confirmed token No public */}
        <Route exact path="/register" element={verifiedToken && <Register />} />

        {/* home - Public */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
