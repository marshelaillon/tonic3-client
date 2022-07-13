import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvents } from '../../state/admin/eventController/eventList';
import { Modal, Button } from 'react-bootstrap';
import { style } from '../../styles/Modal.css';
import AddEvents from './AddEvents';

import AddGuests from './AddGuests';

const Views = ({ current, refresh }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const events = useSelector(state => state.events);
  const listener = useSelector(state => state.listener);
  const dispatch = useDispatch();
  const { type, action } = useParams();
  const [filterEvents, setFilterEvents] = useState([]);

  const getGuests = {
    events: <AddEvents refresh={refresh} />,
    guests: <AddGuests filterEvents={filterEvents} refresh={refresh} />,
    users: <h1>Estoy en users</h1>,
  };

  useEffect(() => {
    if (events.rows) {
      setFilterEvents(events.rows.filter(item => item.status === 'pending'));
    } else {
      dispatch(getEvents())
        .then(({ payload }) => {
          setFilterEvents(
            payload.rows.filter(item => item.status === 'pending')
          );
        })
        .catch(err => console.error(err));
    }
  }, [current]);

  return (
    <>
      <div className="container-sm content border">
        <Modal
          className='modalFondo'
          centered
          show={action}
          onHide={handleClose}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Body className="modalBody">{getGuests[type]}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                navigate(`/admin/app/${listener}`);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Views;
