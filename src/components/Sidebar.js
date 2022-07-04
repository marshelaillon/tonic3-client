import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// * import { SIDEBAR_ITEMS } from '../utils/enviroment';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const user = useSelector(state => state.user);
  const listener = useSelector(state => state.listener);
  const [typeOfUser, setTypeOfUser] = useState('notLogged');
  const { t } = useTranslation();
  const SIDEBAR_ITEMS = {
    logged: [
      {
        title: t('home'),
        path: '/',
        cNm: 'nav-text',
      },
      {
        title: t('profile'),
        path: '/user',
        cNm: 'nav-text',
      },
      {
        title: t('logout'),
        path: '/',
        cNm: 'nav-text',
      },
    ],

    notLogged: [
      {
        title: t('home'),
        path: '/',
        cNm: 'nav-text',
      },
      {
        title: t('profile'),
        path: '/user',
        cNm: 'nav-text',
      },
      {
        title: t('register'),
        path: '/register',
        cNm: 'nav-text',
      },
      {
        title: t('login'),
        path: '/login',
        cNm: 'nav-text',
      },
    ],

    admin: [
      {
        title: t('home'),
        path: '/',
        cNm: 'nav-text',
      },
      {
        title: t('profile'),
        path: '/user',
        cNm: 'nav-text',
      },
      {
        title: 'Admin',
        path: `/admin`,
        cNm: 'nav-text',
      },
      {
        title: t('logout'),
        path: '/',
        cNm: 'nav-text',
      },
    ],
  };

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
