import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useParams,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import User from './components/User';
import Navbar from './commons/Navbar';
import Countdown from './commons/Countdown';
import './styles/App.css';
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
import Events from './components/userEvents/Events';
import Footer from './components/Footer';
import { listener } from './state/admin/adminUI/listener';

// ! BUGS: CUANDO ENTRAS A LA PÁGINA POR PRIMERA VEZ Y TE VAS AL LOGIN, BOTA UN:
// * Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render *
// ! TIENES QUE MODIFICAR LA FECHA PARA QUE CREE UN EVENTO, SINO TE BOTA UN VALUE ERROR

function App() {
  const user = useSelector(state => state.user);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const verifiedToken = useSelector(state => state.verifiedToken);
  const token = useSelector(state => state.token);
  const sidebar = useSelector(state => state.sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { type } = useParams();

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
      !listener && type && (await dispatch(listener(type)));
    })();
  }, []);

  return (
    <div className="container-all">
      <div className={sidebar ? 'overlap' : ''}>
        <Navbar onClickOutside={onClickOutside} />
        <div className={sidebar ? 'blur' : ''}>
          <Routes>
            {/* <Route path="/user" element={user.id && <User />} /> */}
            <Route path="/:id/events" element={<Events />} />
            <Route path="/user" element={user.id && <User />} />
            {(verifiedToken || verifiedGuest?.data?.checked) &&
            verifiedGuest?.data?.verified ? (
              <>
                {!user.id && (
                  <>
                    <Route
                      path="/new-password/:id/:token"
                      element={<NewPassword />}
                    />
                    <Route path="/login" element={<Login />} />
                  </>
                )}
                {user.isAdmin && (
                  <Route path="/admin/app/:type/*" element={<Adminview />} />
                )}

                <Route path="/:id/events" element={<Events />} />

                <Route path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                {/* AGREGAR QUE MOSTRAR EN HOME CUANDO YA ESTA VERIFICADO EL USUARIO. */}
                <Route path="/user" element={user.id && <User />} />
                <Route path="/countdown" element={<Countdown />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </>
            )}
            <Route path="/upgradeEvent" element={<UpgradeEvents />} />
            {/* <Route path="/404" element={<NotFound />} />
            <Route path="/not-found" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
      {<Footer className={sidebar ? 'blur' : ''} />}{' '}
    </div>
  );
}

export default App;
