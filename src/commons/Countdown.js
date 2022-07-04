import { useState, useEffect } from 'react';
import '../styles/Countdown.scss';
import { useSelector } from 'react-redux';

function Countdown() {
  return (
    <>
      <div className="wrap container-sm">
        <div>
          <h1 className="event-title">My Event Title!</h1>
          <h1>
            Event <strong>Countdown</strong>
          </h1>

          <div className="countdown row-sm">
            <div className="bloc-time days" data-init-value="24">
              <span className="count-title">Days</span>

              <div className="figure days days-1">
                <span className="top">1</span>
                <span className="top-back">
                  <span>1</span>
                </span>
                <span className="bottom">1</span>
                <span className="bottom-back">
                  <span>1</span>
                </span>
              </div>

              <div className="figure days days-2">
                <span className="top">7</span>
                <span className="top-back">
                  <span>7</span>
                </span>
                <span className="bottom">7</span>
                <span className="bottom-back">
                  <span>7</span>
                </span>
              </div>
            </div>

            <div className="bloc-time hours" data-init-value="24">
              <span className="count-title">Hours</span>

              <div className="figure hours hours-1">
                <span className="top">2</span>
                <span className="top-back">
                  <span>2</span>
                </span>
                <span className="bottom">2</span>
                <span className="bottom-back">
                  <span>2</span>
                </span>
              </div>

              <div className="figure hours hours-2">
                <span className="top">4</span>
                <span className="top-back">
                  <span>4</span>
                </span>
                <span className="bottom">4</span>
                <span className="bottom-back">
                  <span>4</span>
                </span>
              </div>
            </div>

            <div className="bloc-time min" data-init-value="0">
              <span className="count-title">Minutes</span>

              <div className="figure min min-1">
                <span className="top">4</span>
                <span className="top-back">
                  <span>4</span>
                </span>
                <span className="bottom">4</span>
                <span className="bottom-back">
                  <span>4</span>
                </span>
              </div>

              <div className="figure min min-2">
                <span className="top">9</span>
                <span className="top-back">
                  <span>9</span>
                </span>
                <span className="bottom">9</span>
                <span className="bottom-back">
                  <span>9</span>
                </span>
              </div>
            </div>

            <div className="bloc-time sec" data-init-value="0">
              <span className="count-title">Seconds</span>

              <div className="figure sec sec-1">
                <span className="top">0</span>
                <span className="top-back">
                  <span>0</span>
                </span>
                <span className="bottom">0</span>
                <span className="bottom-back">
                  <span>0</span>
                </span>
              </div>

              <div className="figure sec sec-2">
                <span className="top">1</span>
                <span className="top-back">
                  <span>1</span>
                </span>
                <span className="bottom">1</span>
                <span className="bottom-back">
                  <span>1</span>
                </span>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptate, mollitia, id, itaque voluptates vitae accusantium
              tempore molestias harum soluta non doloremque modi amet quo
              voluptatem. Cum amet iste cumque eos. Placeat facilis unde, hic
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Countdown;
