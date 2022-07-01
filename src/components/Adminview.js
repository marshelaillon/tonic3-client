import React, { useState } from 'react';
import '../styles/adminView.css';

import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../state/admin/eventController/event';

const Adminview = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <div className="container-sm header w-75">
          <div className="row mt-5">
            <div className="list ">
              <ul className="d-flex justify-content-around">
                <li>Events</li>
                <li>Guests</li>
                <li>Users</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="container content mt-5">
        <div class="list-group">
          <a href="#" class="list-group-item active">
            Cras justo odio
          </a>
          <a href="#" class="list-group-item">
            Dapibus ac facilisis in
          </a>
          <a href="#" class="list-group-item">
            Morbi leo risus
          </a>
          <a href="#" class="list-group-item">
            Porta ac consectetur ac
          </a>
          <a href="#" class="list-group-item">
            Vestibulum at eros
          </a>
        </div>
      </div>
    </>
  );
};

export default Adminview;
