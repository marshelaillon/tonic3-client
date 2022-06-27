import '../styles/Navbar.css';

import { GoHome, GoPerson } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { toggleSidebar } from '../state/UI/sidebar';

function Navbar() {
  const sidebar = useSelector(state => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className="nav-style">
      <NavLink to={'/'} className="home-icon">
        <GoHome size={40} />
      </NavLink>
      <div className="home-icon">
        <div
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <GoPerson size={40} />
        </div>
      </div>
      {sidebar && <Sidebar />}
    </div>
  );
}
export default Navbar;
