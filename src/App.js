import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

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
import { getEmailList } from './state/guests/emailList';
import NewPassword from './components/NewPassword';

function App() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.user);
  const guestEmails = useSelector(state => state.guestEmails);
  const dispatch = useDispatch();
  const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/', {
      withCredentials: false,
    });
    const country = await axios.get('https://ipapi.co/json/', {
      withCredentials: false,
    });
    console.log('country', country.data);
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    dispatch(getEmailList());
    getData();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        console.log(position);
      });
    }
  }, []);

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
        <Route exact path="/register" element={<Register />} />

        {/* home - Public */}
        <Route path="/" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/new-password/:id/:token" element={<NewPassword />} />
      </Routes>
    </>
  );
}

export default App;
