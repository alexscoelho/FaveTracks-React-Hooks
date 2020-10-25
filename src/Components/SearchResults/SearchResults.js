import React from 'react';
import './SearchResults.css'
import {TrackList} from '../TrackList/TrackList'

export const SearchResults = ({searchResults}) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={searchResults}/>
        </div>
    );
}