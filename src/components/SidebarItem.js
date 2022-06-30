import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../state/UI/sidebar';
import { checkUser, logoutUser } from '../state/user/user';
import { sidebarCollapsed } from '../utils/utils';
import { useTranslation } from 'react-i18next';
import { checkCaptcha } from '../state/captcha/captcha';

export default function SidebarItem({ index, item, setTypeOfUser }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <li key={index} className={item.cNm} onClick={sidebarCollapsed}>
        <Link
          to={item.path}
          onClick={e => {
            if (item.title === t('login')) {
              dispatch(checkCaptcha());
            }
            if (item.title === t('logout')) {
              dispatch(logoutUser());
              dispatch(checkUser());
              dispatch(toggleSidebar());
              setTypeOfUser('notLogged');
              navigate('/');
            }
          }}
        >
          {item.title}
        </Link>
      </li>
    </>
  );
}
