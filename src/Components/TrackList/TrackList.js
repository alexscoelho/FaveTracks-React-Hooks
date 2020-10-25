import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export const TrackList = ({tracks, onAdd, isRemoval, onRemove }) => {
    return (
        <div className="TrackList">
            {tracks.map((track) => {
                return <Track isRemoval={isRemoval} onRemove={onRemove} onAdd={onAdd} track={track}/>
            })}
        </div>
    );
}
