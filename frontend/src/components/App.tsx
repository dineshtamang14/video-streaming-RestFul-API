import React, { useEffect, useState } from 'react';
import { Hls, Player, Video, DefaultUi, DefaultControls } from '@vime/react';
import backgroundImage from '../assets/background.png';
import './App.css';
import '@vime/core/themes/default.css';

const HOST = 'http://localhost:8000';

export const App = () => {
    const [posterUrl, setPosterUrl] = useState<string>();

    const getVideoPoster = async () => {
        const res = await fetch(`${HOST}/poster`);
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
            
        <div className="container">
            <h1 className="title">Segments</h1>
            <div className="player-container">
                <Player controls autoplay={false}>
                    <Hls version="latest" poster={posterUrl}>
                        <source data-src={`${HOST}/segments`} type="application/x-mpegURL" />
                    </Hls>
                    <DefaultUi>
                        <DefaultControls hideOnMouseLeave activeDuration={2000} />
                    </DefaultUi>
                </Player>
            </div>
        </div>

        {/* <div className="container">
            <h1 className="title">Chunks</h1>
            <Player className="player-container">
                <Video poster={posterUrl}>      
                    <source data-src={`${HOST}/video`} type="video/mp4" />
                </Video>
                <DefaultUi>
                    <DefaultControls hideOnMouseLeave activeDuration={2000} />
                </DefaultUi>
            </Player>
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