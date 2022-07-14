import React from 'react';

export default function Item({ event }) {
  return (
    <>
      {/* <div className=" col-sm" style={{ width: '250px' }}> */}
      <div class="card" /*  style="width: 18rem;" */ style={{ height: '100%' }}>
        <img class="card-img-top" src={event.image} alt="Card image cap" />
        <div className="container-sm flex-column align-items-evenly">
          <div
            class="card-body"
            style={{
              backgroundColor: 'whitesmoke',
              height: '80px',
              overflow: 'hidden',
            }}
          >
            <h2 class="card-title" style={{ fontSize: '120%' }}>
              {event.title}
            </h2>
            <p class="card-text" /* style={{ maxHeight: '50px' }} */>
              {event.description}
            </p>
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
    </>
  );
}
