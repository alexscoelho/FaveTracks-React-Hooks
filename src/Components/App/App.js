import React, {useState} from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
  {
    name: 'Run to the hills',
    artist: 'Iron Maiden',
    album: '666',
    id: 1
  },
  {
    name: 'Painkiller',
    artist: 'Judas Priest',
    album: 'Any',
    id: 2
  },
  {
    name: 'Beat it',
    artist: 'Michael Jackson',
    album: 'Any',
    id: 3
  }
]);

const [playlistName, setPlaylistName] = useState('Best Moments');
const [playlistTracks, setPlaylistTracks] = useState([
  {
    name: 'Glasgow Kiss',
    artist: 'John Petrucci',
    album: 'Suspended Animation',
    id: 4
  },
  {
    name: 'I wanna love you',
    artist: 'Bob Marley',
    album: 'Any',
    id: 5
  }
]);

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

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults={searchResults}/> {/*passed the state of search results and the method for adding tracks */}
          <Playlist onNameChange={updatePlaylistName} onRemove={removeTrack} playlistName={playlistName} playlistTracks={playlistTracks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
