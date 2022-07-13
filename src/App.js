import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import User from './components/User';
import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';
import './styles/App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, setToken } from './state/user/user';
import Home from './components/Home';
import NewPassword from './components/NewPassword';
import { RegisterRequest } from './utils/sweetAlerts';
import NotFound from './components/NotFound';
import Adminview from './components/adminView/Adminview';
import { toggleSidebar } from './state/UI/sidebar';
import { setVerifiedGuest } from './state/guests/verifyGuest';
import { getUserEvents } from './state/user/userEvents';
import { setcurrentEvent } from './state/user/currentEvent';
import UpgradeEvents from './components/adminView/UpgradeEvents';
import { logoutUser } from './state/user/user.js';


function App() {
  const user = useSelector(state => state.user);
  const currentEvent = useSelector(state => state.currentEvent);

  const verifiedGuest = useSelector(state => state.verifiedGuest);

  const verifiedToken = useSelector(state => state.verifiedToken);

  const userEvents = useSelector(state => state.userEvents);
  const token = useSelector(state => state.token);
  const sidebar = useSelector(state => state.sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let onClickOutside = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    if (verifiedToken) {
      navigate('/register');
      RegisterRequest();
    }
  }, [verifiedToken]);

  useEffect(() => {
    (async () => {
      await dispatch(setToken(localStorage.getItem('token')));
      !user.id && !token && (await dispatch(checkUser()));
      if (user.id) {
        await dispatch(getUserEvents());
        await dispatch(setcurrentEvent());
      }
    })();
  }, [user.id, token]);

  useEffect(() => {
    (async () => {
      !verifiedGuest?.data && (await dispatch(setVerifiedGuest()));
    })();
  }, []);

  // useEffect(() => {
  //   dispatch(setToken(localStorage.getItem('token')));
  // }, []);

  return (
    <div className="container-all">
      <div className={sidebar ? 'overlap' : ''}>
        <Navbar onClickOutside={onClickOutside} />
        <div className={sidebar ? 'blur' : ''}>
          {/* {verifiedGuest.verified && verifiedToken && <Countdown />} */}

          <Routes>
            {/* <Route path="/user" element={user.id && <User />} /> */}

            {((verifiedToken || verifiedGuest?.data?.checked) && verifiedGuest?.data?.verified) ? (

              <>
                {!user.id && (<>
                  <Route path="/new-password/:id/:token" element={<NewPassword />} />
                  <Route path="/login" element={<Login />} />
                </>)}
                <Route path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/user" element={user.id && <User />} />
                <Route path="/admin/app/:type/*" element={<Adminview />} />

              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                {/* AGREGAR QUE MOSTRAR EN HOME CUANDO YA ESTA VERIFICADO EL USUARIO. */}
                <Route path="/user" element={user.id && <User />} />

                <Route path="/countdown" element={<Countdown />} />
              </>
            )}

            <Route path="/404" element={<NotFound />} />
            {/*  <Route path="*" element={<Navigate to="/404" />} /> */}
            <Route path="/not-found" element={<NotFound />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
