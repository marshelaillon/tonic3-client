import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import User from './components/User';
import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';
import './styles/App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './state/user/user';
import Home from './components/Home';

import LoginWhitToken from './components/LoginWithToken';
import { verifyToken } from './state/guests/verifyToken';
import NewPassword from './components/NewPassword';
import { RegisterRequest } from './utils/sweetAlerts';
import { checkCaptcha } from './state/captcha/captcha';
import Adminview from './components/Adminview';

function App() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const captcha = useSelector(state => state.captcha);
  const sidebar = useSelector(state => state.sidebar);
  const verifiedToken = useSelector(state => state.verifiedToken);
  const dispatch = useDispatch();
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
    <div className={sidebar ? 'overlap' : ''}>
      <Navbar />
      {verifiedGuest.verified && <Countdown />}
      <Routes>
        {!verifiedToken ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
            <Route
              exact
              path="/login"
              element={!user.id && verifiedGuest.checked && <Login />}
            />
            <Route exact path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/new-password/:id/:token" element={<NewPassword />} />
            <Route path="/user" element={<User />} />
          </>
        )}
        {/* AGREGAR QUE MOSTRAR EN HOME CUANDO YA ESTA VERIFICADO EL USUARIO. */}
        <Route path="/cosas-de-admin" element={<Adminview />} />
      </Routes>
    </div>
  );
}

export default App;
