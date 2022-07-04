import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvents } from '../../state/admin/eventController/eventList';
import AddEvents from '../AddEvents';
import AddGuests from '../AddGuests';

const Views = ({ current }) => {
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
    dispatch(getEvents()).then(({ payload }) =>
      setFilterEvents(
        payload.data.rows.filter(item => item.status === 'pending')
      )
    );
  }, [current]);
  return (
    <>
      <div className="container-sm content border">{getGuests[type]}</div>
    </>
  );
};

export default Views;
