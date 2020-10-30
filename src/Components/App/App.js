import React, {useState} from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

import Spotify from '../../util/Spotify'

function App() {
const [searchResults, setSearchResults] = useState([]);
const [playlistName, setPlaylistName] = useState('New Playlist');
const [playlistTracks, setPlaylistTracks] = useState([]);

const addTrack = (track) => {
  if (playlistTracks.find(savedTrack => savedTrack.id === track.id )) {
    return;
  } else {
    setPlaylistTracks(prevTracks => {
      return [track, ...prevTracks];
    })
  };
}

const removeTrack = (track) => {
  setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
}

const updatePlaylistName = (name) => {
  setPlaylistName(name)
}

const savePlaylist = () => {
  const trackUris = playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(playlistName, trackUris).then(() => {
    setPlaylistName('New Playlist');
    setPlaylistTracks([])
  })
}

const search = (searchTerm) => {
  Spotify.search(searchTerm).then(searchResults => {
    setSearchResults(searchResults)
  })
}

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults={searchResults}/> {/*passed the state of search results and the method for adding tracks */}
          <Playlist onSave={savePlaylist} onNameChange={updatePlaylistName} onRemove={removeTrack} playlistName={playlistName} playlistTracks={playlistTracks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
