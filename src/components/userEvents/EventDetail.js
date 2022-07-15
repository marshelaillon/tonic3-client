import React from 'react';

export default function EventDetail({ event }) {
  return (
    <>
      <div
        class="card mb-3"
        style={
          {
            maxWidth: '100%',
          } /* { heigth: '800px', width: '1500px' } */
        }
      >
        <div class="row no-gutters">
          <div class="col-md-4" style={{ heigth: '100px' }}>
            <img
              src={event.image}
              class="card-img"
              height={'100%'}
              width={'100%'}
            />
          </div>
          <div class="col-md-8" style={{ backgroundColor: 'whitesmoke' }}>
            <div class="card-body">
              <h2 class="card-title" style={{ fontSize: '150%' }}>
                {event.title}
              </h2>
              <p class="card-text">{event.description}</p>
              <p class="card-text">
                <small class="text-muted">
                  <strong style={{ fontSize: '120%' }}>
                    Comming soon... {event.date}
                  </strong>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-sm flex-sm-row ">
        <div class="card" style={{ height: '100%' }}>
          <img
            class="card-img-top"
            src={event.image}
            alt="Card image cap"
            height={'300px'}
          />
          <div className="container-sm flex-column align-items-evenly">
            <div
              class="card-body "
              style={{
                backgroundColor: 'whitesmoke',
                height: '100%',
                //   overflow: 'hidden',
              }}
            >
              <h2 class="card-title" style={{ fontSize: '120%' }}>
                {event.title}
              </h2>
              <p class="card-text" style={{ maxHeight: '50px' }}>
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
      </div> */}
    </>
  );
}
