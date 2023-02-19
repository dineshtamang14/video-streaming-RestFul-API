import React, { useEffect, useState } from 'react';
import { Hls, Player, Video, DefaultUi, DefaultControls } from '@vime/react';
import backgroundImage from '../assets/background.png';
import './App.css';
import '@vime/core/themes/default.css';

const HOST = 'http://localhost:3001';

/**
 * Video player: https://vimejs.com/components/providers/video
 */
export const App = () => {
    const [posterUrl, setPosterUrl] = useState<string>();

    const getVideoPoster = async () => {
        const res = await fetch(`${HOST}/segments-poster`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        setPosterUrl(url);
    };

    useEffect(() => {
        getVideoPoster();
    }, []);

    return (
        <div>
            <div className="image-container">
                <img className="image" src={backgroundImage} alt="some info" />
            </div>

            <Player autoplay={false}>
            <Video poster={posterUrl}>      
                    <source data-src={`${HOST}/video-chunk`} type="video/mp4" />
                    </Video>
                <DefaultUi>
                <DefaultControls hideOnMouseLeave activeDuration={2000} />
      </DefaultUi>
            </Player>
        {/* <div className="container">
            <h1 className="title">Segments</h1>
            <div className="player-container">
                <Player controls autoplay={false}>
                    <Hls version="latest" poster={posterUrl}>
                        <source data-src={`${HOST}/segments-list`} type="application/x-mpegURL" />
                    </Hls>
                </Player>
            </div>
        </div> */}

        {/* <div className="container">
            <h1 className="title">Chunks</h1>
            <div className="player-container">
                <Video poster={posterUrl}>
                    <source data-src={`${HOST}/video-chunk`} type="video/mp4" />
                </Video>
            </div>
        </div> */}

        {/* <div className="container">
            <h1 className="title">File</h1>
            <div className="player-container">
            <Video poster={posterUrl}>
                    <source data-src={`${HOST}/video-file`} type="video/mp4" />
                </Video>
            </div>
        </div> */}
        </div>
    );
};