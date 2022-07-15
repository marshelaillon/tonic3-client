import React from 'react';
import ReactPlayer from 'react-player';
import { Ratio } from 'react-bootstrap'
import '../styles/VideoPlayer.css';
import '../styles/Home.css'
const VideoPlayer = () => {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className="videoPlayer"
                url="https://www.twitch.tv/rubius"
                controls={true}
                width='100%'
                height='100%'
            />
        </div>
    );
};

export default VideoPlayer;
