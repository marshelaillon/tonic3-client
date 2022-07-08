import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import '../styles/LanguageDropdown.css';
import { useTranslation } from 'react-i18next';
import { GoHome, GoPerson } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { toggleSidebar } from '../state/UI/sidebar';
import LanguageDropdown from '../components/LanguageDropdown';
import { Button, Nav } from 'react-bootstrap';

function Navbar({ onClickOutside }) {
  const { t } = useTranslation();
  const sidebar = useSelector(state => state.sidebar);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event => {
      // Prevent the mini-infobar from appearing on mobile.
      // event.preventDefault();
      console.log('👍', 'beforeinstallprompt', event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function download() {
    console.log('Hiciste click en el disparador de descarga');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log('no prompt event guardado en window');
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }
  return (
    <div className="nav-style row-sm">
      <NavLink to={'/'} className="home-icon ">
        <GoHome size={40} />
      </NavLink>
      <h2 className="welcome-msg">
        {user.userName ? `${t('welcome')}, ${user.userName}` : t('welcome_msg')}
      </h2>
      <div
        className="home-icon"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <div
          className="person-icon"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <GoPerson
            className="home-icon person-icon"
            style={{
              margin: '0 10px',
              cursor: 'pointer',
            }}
            size={40}
          />
        </div>
        <LanguageDropdown className="language-dropdown" />
      </div>

      {sidebar && <Sidebar onClickOutside={onClickOutside} />}
    </div>
  );
}
export default Navbar;
