import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export const TrackList = ({tracks, onAdd}) => {
    return (
        <div className="TrackList">
            {tracks.map((track) => {
                return <Track onAdd={onAdd} track={track}/>
            })}
        </div>
    );
}
