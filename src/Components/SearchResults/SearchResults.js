import React from 'react';
import './SearchResults.css'
import {TrackList} from '../TrackList/TrackList'

export const SearchResults = ({searchResults, onAdd}) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList onAdd={onAdd} tracks={searchResults} isRemoval={false}/>
        </div>
    );
}