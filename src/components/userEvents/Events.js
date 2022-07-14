import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carrousel from './Carrousel';
import Item from './Item';

export default function Events() {
  const { id } = useParams();
  const userEvents = useSelector(state => state.userEvents);
  return (
    <>
      <Carrousel />
      <div className="container-sm">
        <div className="row-sm d-flex flex-wrap justify-content-center">
          {userEvents?.events?.map((event, i) => (
            <div className="col-sm-3 m-3">
              <Item key={i} event={event} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
