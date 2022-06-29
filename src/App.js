import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';
import ForgotPassword from './components/ForgotPassword';

import './styles/App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './state/user/user';
import Home from './components/Home';


import LoginWhitToken from './components/LoginWithToken';

import { verifyToken } from './state/guests/verifyToken';
import NewPassword from './components/NewPassword';
import { RegisterRequest } from './utils/sweetAlerts';


function App() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const verifiedToken = useSelector(state => state.verifiedToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (verifiedToken) {
      navigate('/register');
      RegisterRequest();
    }
  }, [verifiedToken]);

  useEffect(() => {
    dispatch(checkUser());
  }, [user.id]);

  return (
    <>
      <Navbar />
      <Countdown />
      <Routes>
        {/* confirm access-Public */}
        
        <Route exact path="/login-with-token" element={<LoginWhitToken />}/>
          {/* home - Public */}

        <Route exact path="/login" element={!user.id && <Login />} />
        {/* register- confirmed token No public */}
        <Route exact path="/register" element={!verifiedToken && <Register />} />

        {/* home - Public */}

        <Route path="/" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/new-password/:id/:token" element={<NewPassword />} />
      </Routes>
    </>
  );
}

export default App;
