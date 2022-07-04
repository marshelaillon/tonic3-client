import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../state/UI/sidebar';
import { checkUser, logoutUser } from '../state/user/user';
import { sidebarCollapsed } from '../utils/utils';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

export default function SidebarItem({ index, item, setTypeOfUser }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {item.title === 'Cosas de admin' ? (
        <li className={item.cNm}>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#020122',
              }}
              id="dropdown-basic"
            >
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: '#020122',
                border: 'none',
              }}
            >
              <Dropdown.Item style={{ color: '#f5f6f7' }} href="/cosas-de-admin">
                Crear evento
              </Dropdown.Item>
              <Dropdown.Item style={{ color: '#f5f6f7' }} href="#/action-2">
                Invitar usuarios
              </Dropdown.Item>
              <Dropdown.Item style={{ color: '#f5f6f7' }} href="#/action-3">
                Ver eventos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      ) : (
        <li key={index} className={item.cNm} onClick={sidebarCollapsed}>
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
      )}
    </>
  );
}
