import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import '../styles/VideoPlayer.css';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEvents } from '../state/user/userEvents';
import { Button } from 'react-bootstrap';

const VideoPlayer = () => {
    const currentEvent = useSelector(state => state.currentEvent);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserEvents());
    }, []);
    return (
        <>{user.id && (
            <>

                <div className="player-wrapper">
                    <ReactPlayer
                        className="videoPlayer"
                        url={`${currentEvent?.event?.url}`}
                        playing={true}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                </div>
                <Button variant='transparent'>
                    <a
                        href={`${currentEvent?.event?.url}`}
                        target="_blank"
                        style={{ color: 'orange ', textDecoration: 'none' }}
                    >
                        Ir la pagina
                    </a>
                </Button>
            </>
        )}
        </>
    );
};

export default VideoPlayer;
