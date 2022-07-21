//import App.css
import React, { useState, useEffect} from 'react'
import "./App.css";
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Playlist from "../Playlist/Playlist"
import Spotify from '../../utils/Spotify'

//import 3 components
// const containState = () => {
//   const [state, setState] = useState  ({
//     searchResults: [],
//     playlistName: '',
//     playlistTracks: []
//   })
// }




const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    Spotify.getAccessToken()
  }, [])
  

  const addTrack = (track) => {
    if (playlistTracks.find(playlistTrack  => playlistTrack.id === track.id)) {
      setPlaylistTracks(playlistTracks => ({
        playlistTracks: [...playlistTracks, track]
      }))
    }
  }
  const removeTrack = (track) => {
    if (playlistTracks.find(playlistTrack  => playlistTrack .id !== track.id))  {
      setPlaylistTracks(playlistTracks => ({
        playlistTracks: [...playlistTracks, track]
      }))
    }
  }

  const updatePlaylistName = (name) => {
    setPlaylistName({playlistName: name})
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(playlistName, trackUris);
    setSearchResults(
      searchResults
    );
    updatePlaylistName('My playlist');
    console.info(trackUris);
  }

  const search = (term) => {
    console.log(term)
    Spotify.search(term)
      .then(searchResults => setSearchResults(
        searchResults
    ));
  }


  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch= { search }/> 
        <div className="App-playlist">
            <SearchResults searchResults= {searchResults} onAdd= {addTrack} onRemove= {removeTrack}/>
            <Playlist 
            playlistName= {playlistName} 
            tracks= {playlistTracks} 
            onNameChange= {updatePlaylistName} 
            onSave= {savePlaylist}/>
        </div>
      </div>
    </div>
  );
};

export default App;
