import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listener } from '../../state/admin/adminUI/listener';
import '../../styles/adminView.css';

export default function Header() {
  const _listener = useSelector(state => state.listener);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownItems = [
    { title: 'Events', options: ['Add event'] },
    {
      title: 'Guests',
      options: ['Add guest'],
    },
    { title: 'Users' },
  ];

  return (
    <>
      <header>
        <div className="container-sm header ">
          <div className="row mt-5 ">
            <div className="list col">
              <ul className="d-flex justify-content-around">
                {dropdownItems.map((item, i) => (
                  <>
                    <span className="span-column">
                      <li
                        className="container-li"
                        key={`li ${i}`}
                        onClick={e => {
                          e.preventDefault();
                          dispatch(listener(item.title.toLowerCase()));
                          navigate(`/admin/app/${item.title.toLowerCase()}`);
                        }}
                      >
                        {item.title}
                      </li>
                      <Dropdown
                        id={`dropdown-button-drop-end`}
                        drop={'end'}
                        variant="secondary"
                        title={`Drop end`}
                        key={i}
                      >
                        <Dropdown.Toggle
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'inherit',
                          }}
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu
                          key={`dropd.menu ${i}`}
                          style={{
                            backgroundColor: '#020122',
                            border: 'none',
                          }}
                        >
                          {item?.options?.map((option, i) => (
                            <span>
                              <Dropdown.Item
                                key={`dropd.item ${i}`}
                                style={{ color: '#f5f6f7' }}
                                onClick={e => {
                                  dispatch(
                                    listener(item.title.toLowerCase())
                                  ).then(({ payload }) =>
                                    navigate(`/admin/app/${payload}/${option}`)
                                  );
                                }}
                              >
                                {option}
                              </Dropdown.Item>
                            </span>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
