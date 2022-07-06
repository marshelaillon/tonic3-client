import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvents } from '../../state/admin/eventController/eventList';

import AddEvents from './AddEvents';

import AddGuests from './AddGuests';

const Views = ({ current }) => {
  const events = useSelector(state => state.events);
  const listener = useSelector(state => state.listener);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();
  const [filterEvents, setFilterEvents] = useState([]);
  // useEffect(() => {
  //   listener && navigate();
  // }, [listener]);
  const getGuests = {
    events: <AddEvents />,
    guests: <AddGuests filterEvents={filterEvents} />,
    users: <h1>Estoy en users</h1>,
  };

  useEffect(() => {
    if (events.rows) {
      setFilterEvents(events.rows.filter(item => item.status === 'pending'));
    } else {
      dispatch(getEvents()).then(({ payload }) => {
        setFilterEvents(payload.rows.filter(item => item.status === 'pending'));
      })
        .catch(err => console.error(err));
    }
  }, [current]);
  return (
    <>
      <div className="container-sm content border">{getGuests[type]}</div>
    </>
  );
};

export default Views;
