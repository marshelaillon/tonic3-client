import '../styles/Navbar.css';

import { GoHome, GoPerson } from 'react-icons/go';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logoutUser } from '../state/user/user';
import { useSelector } from 'react-redux';

function Navbar() {
  const user = useSelector(state => state.user);
  const [userConected, setUserConected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user.id && setUserConected(true);
    // console.log(Usermenu[2].title);
  }, [user]);

  const Usermenu = [
    {
      title: 'Home',
      path: '/home',
      cNm: 'nav-text',
    },
    {
      title: 'Profile',
      path: '/user',
      cNm: 'nav-text',
    },
    {
      title: !userConected ? 'login' : 'logout',
      path: userConected ? '/' : '/login',
      cNm: 'nav-text',
    },
  ];
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const sidebarCollapsed = () => setSidebar(!sidebar);

  return (
    <div className="nav-style">
      <NavLink to={'/home'} className="home-icon">
        <GoHome size={40} />
      </NavLink>
      <div className="home-icon">
        <div onClick={sidebarCollapsed}>
          <GoPerson size={40} />
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-item">
          {Usermenu.map((item, index) => {
            return (
              <li key={index} className={item.cNm} onClick={sidebarCollapsed}>
                <Link
                  to={item.path}
                  onClick={e => {
                    if (item.title == 'logout') {
                      dispatch(logoutUser());
                      setUserConected(false);
                      navigate('/');
                    }
                  }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
