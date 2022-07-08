import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../state/UI/sidebar';
import { checkUser, logoutUser } from '../state/user/user';
import { sidebarCollapsed } from '../utils/utils';
import { useTranslation } from 'react-i18next';

export default function SidebarItem({ index, item, setTypeOfUser }) {
  const listener = useSelector(state => state.listener);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <li key={index} className={item.cNm} onClick={sidebarCollapsed}>
        <Link
          to={
            item.title == 'Admin'
              ? `${item.path}/app/${listener || 'guests'}`
              : item.path
          }
          onClick={e => {
            if (item.title === t('logout')) {
              (async () => {
                await dispatch(logoutUser());
                await dispatch(checkUser());
                await dispatch(toggleSidebar());
                setTypeOfUser('notLogged');
                navigate('/');
              })();
            }
          }}
        >
          {item.title}
        </Link>
      </li>
    </>
  );
}
