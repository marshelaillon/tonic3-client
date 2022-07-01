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
import NewPassword from './components/NewPassword';
import { RegisterRequest } from './utils/sweetAlerts';
import Adminview from './components/Adminview';

function App() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
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
        <Route
          path="/login"
          element={/* !user.id && verifiedGuest.checked && */ <Login />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/new-password/:id/:token" element={<NewPassword />} />
        {!verifiedToken && !verifiedGuest.verified ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
            <Route
              exact
              path="/register"
              element={!verifiedGuest.checked && <Register />}
            />
            <Route path="/user" element={user.id && <User />} />
            <Route path="/" element={<Home />} />
          </>
        )}
        {/* AGREGAR QUE MOSTRAR EN HOME CUANDO YA ESTA VERIFICADO EL USUARIO. */}
        <Route path="/cosas-de-admin" element={<Adminview />} />
      </Routes>
    </div>
  );
}

// DEMO 01/07
// USO HORARIO POR IP ----> MOMENT
// avetriguar sobre lenscrip ---> obtenes un certificado SSL.

export default App;
