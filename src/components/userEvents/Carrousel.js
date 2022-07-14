import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';

export default function Carrousel() {
  const userEvents = useSelector(state => state.userEvents);
  return (
    <>
      <div
        className="row-sm align-items-center my-5"
        style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
      >
        <Carousel variant="white">
          {userEvents?.events?.map((event, i) => {
            return (
              <Carousel.Item
                key={i}
                style={{ minWidth: '100vw', maxHeight: '500px' }}
              >
                <img className="d-block w-100" src={event.image} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
