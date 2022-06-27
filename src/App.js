import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';

import './styles/App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './state/user/user';
import Home from './components/Home';

function App() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [user.id]);

  return (
    <>
      <Navbar />
      <Countdown />
      <Routes>
        {/* confirm access-Public */}
        <Route exact path="/login" element={<Login />} />
        {/* register- confirmed token No public */}
        <Route exact path="/register" element={<Register />} />

        {/* home-No Public */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
