import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SIDEBAR_ITEMS } from '../utils/enviroment';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const user = useSelector(state => state.user);
  const [typeOfUser, setTypeOfUser] = useState('notLogged');

  useEffect(() => {
    if (!user.id) setTypeOfUser('notLogged');
    if (user.id && user.isAdmin) setTypeOfUser('admin');
    if (user.id && !user.isAdmin) setTypeOfUser('logged');
  }, [user.id]);

  return (
    <>
      <nav className={'nav-menu active'}>
        <ul className="nav-menu-item">
          {SIDEBAR_ITEMS[typeOfUser].map((item, index) => {
            return (
              <SidebarItem
                index={index}
                item={item}
                setTypeOfUser={setTypeOfUser}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
}
