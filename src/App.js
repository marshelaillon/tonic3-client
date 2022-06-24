import React, { useEffect } from 'react'; //tools
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login'; //components
import Register from './components/Register';
//import Home from './components/Home';

import Navbar from './commons/Navbar'; //commons
import Countdown from './commons/Countdown';

import './styles/App.css'; //styles
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
