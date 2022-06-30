import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../state/UI/sidebar';
import { checkUser, logoutUser } from '../state/user/user';
import { sidebarCollapsed } from '../utils/utils';
import { useTranslation } from 'react-i18next';


export default function SidebarItem({ item, setTypeOfUser }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  return (
    <>
      <li className={item.cNm} onClick={sidebarCollapsed}>
        <Link
          to={item.path}
          onClick={e => {
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
