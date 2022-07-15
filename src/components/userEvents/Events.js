import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carrousel from './Carrousel';
import Item from './Item';
import '../../styles/UserEvents.css';

export default function Events() {
  const { id } = useParams();
  const userEvents = useSelector(state => state.userEvents);
  return (
    <>
      <div>
        <Carrousel />
        <div className="container-sm">
          <div className="row-sm d-flex flex-wrap justify-content-center">
            {userEvents?.events?.map((event, i) => (
              <div
                className="col-sm-3 col-md-3 m-3"
                style={{ maxHeight: '500px', minWidth: '300px' }}
              >
                <Item key={i} event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
