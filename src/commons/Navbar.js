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

function Navbar({ onClickOutside }) {
  const { t } = useTranslation();
  const sidebar = useSelector(state => state.sidebar);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <div className="nav-style">
      <NavLink to={'/'} className="home-icon ">
        <GoHome size={40} />
      </NavLink>
      <h2 className="welcome-msg">
        {user.userName ? `Welcome, ${user.userName}` : t('welcome_msg')}
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
