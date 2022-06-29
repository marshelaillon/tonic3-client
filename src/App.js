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
import { getEmailList } from './state/guests/emailList';
import LoginWhitToken from './components/LoginWithToken';

function App() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const guestEmails = useSelector(state => state.guestEmails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailList());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, [user.id]);
  console.log(guestEmails);
  return (
    <>
      <Navbar />
      <Countdown />
      <Routes>
        {/* confirm access-Public */}
        <Route exact path="/login" element={/* user.id && */ <Login />} />
        {/* register- confirmed token No public */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login-with-token" element={<LoginWhitToken />}/>
          {/* home - Public */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
