import { React, useState } from 'react';
import '../../styles/UserEvents.css';
import EventDetail from './EventDetail';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Item({ event }) {
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* <div className=" col-sm" style={{ width: '250px' }}> */}
      <div
        class="card card-ev"
        style={{ height: '100%' }}
        onClick={e => setShowDetail(true)}
      >
        <img
          class="card-img-top"
          src={event.image}
          alt="Card image cap"
          height={'200px'}
        />
        <div className="container-sm flex-column align-items-evenly">
          <div
            class="card-body "
            style={{
              backgroundColor: 'whitesmoke',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <h2 class="card-title" style={{ fontSize: '120%' }}>
              {event.title}
            </h2>
            {/*  <p class="card-text" style={{ maxHeight: '50px' }}>
              {event.description}
            </p> */}
            <br />
            <p class="card-text">
              <strong>
                Coming soon {event.date.slice(0, event.date.indexOf('T'))}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* </div> */}
      {showDetail && (
        <Modal
          className="modalFondo"
          centered
          show={showDetail}
          onHide={!showDetail}
          backdrop="static"
          keyboard={true}
          size="xl"
        >
          <Modal.Body className="">{<EventDetail event={event} />}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDetail(false);
                // navigate(`/admin/app/${listener}`);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
