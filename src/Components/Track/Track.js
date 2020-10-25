import React from 'react';
import './Track.css';

export const Track = ({isRemoval, track}) => {

    const renderAction = () => {
        return (
            isRemoval ? (
            <button className='Track-action'>-</button>
            ) : (
            <button className='Track-action'>+</button>
            )
        );
    }

    return (
        <div key={track.id} className="Track">
            <div className="Track-information">
               <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action">{renderAction()}</button>
        </div>
    );
}

