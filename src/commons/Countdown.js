import { useState, useEffect, useRef } from 'react';
import '../styles/Countdown.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Countdown() {
  const { t } = useTranslation();
  const currentEvent = useSelector(state => state.currentEvent);
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date(currentEvent?.event?.date).getTime();

    interval = setInterval(() => {
      const now = +new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));

      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer
        console.log();
        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <>
      {currentEvent.event && (
        <div className="wrap container-sm">
          <div className="contain-countdown">
            <div>
              <h1 className="event-title">
                Event <strong>{currentEvent?.event?.title}</strong>
              </h1>
            </div>
            <div className="contain-countdown-description">
              <div className="countdown">
                <div className="box-1">
                  <div className="bloc-time days" data-init-value="24">
                    <span className="count-title">{t('days')}</span>


                    <div className="figure days days-2">
                      <span className="top">{timerDays}</span>
                      <span className="top-back">
                        <span>{timerDays}</span>
                      </span>
                      <span className="bottom">{timerDays}</span>
                      <span className="bottom-back">
                        <span>{timerDays}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bloc-time hours" data-init-value="24">
                    <span className="count-title">{t('hours')}</span>

                    <div className="figure hours hours-2">
                      <span className="top">{timerHours}</span>
                      <span className="top-back">
                        <span>{timerHours}</span>
                      </span>
                      <span className="bottom">{timerHours}</span>
                      <span className="bottom-back">
                        <span>{timerHours}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <span style={{ color: '#020122' }}>/n /n /n</span>

                <div className="box-2">
                  <div className="bloc-time min" data-init-value="0">
                    <span className="count-title">{t('minutes')}</span>


                    <div className="figure min min-2">
                      <span className="top">{timerMinutes}</span>
                      <span className="top-back">
                        <span>{timerMinutes}</span>
                      </span>
                      <span className="bottom">{timerMinutes}</span>
                      <span className="bottom-back">
                        <span>{timerMinutes}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bloc-time sec" data-init-value="0">
                    <span className="count-title">{t('seconds')}</span>

                    <div className="figure sec sec-2">
                      <span className="top">{timerSeconds}</span>
                      <span className="top-back">
                        <span>{timerSeconds}</span>
                      </span>
                      <span className="bottom">{timerSeconds}</span>
                      <span className="bottom-back">
                        <span>{timerSeconds}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="description">
                <p>{currentEvent?.event?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Countdown;
