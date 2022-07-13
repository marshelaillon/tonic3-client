import React from 'react';

export default function Item({ event }) {
  return (
    <>
      {/* <div className=" col-sm" style={{ width: '250px' }}> */}
      <div
        class="card" /*  style="width: 18rem;" */
        style={{ height: '500px' }}
      >
        <img
          class="card-img-top"
          src="https://www.nacionflix.com/__export/1608357649862/sites/debate/img/2020/12/18/la_batallas_mxs_xpicas_del_anime_naruto_crop1608357496310.jpg_91657744.jpg"
          alt="Card image cap"
        />
        <div className="container-sm flex-column align-items-evenly">
          <div
            class="card-body"
            style={{ backgroundColor: 'whitesmoke', height: '300px' }}
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
