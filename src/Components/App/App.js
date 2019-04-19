import React from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../util/Spotify.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
      playlistName: 'Default Playlist Name'
    }

    /////// BINDS ///////
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlist.find(
      savedTrack => savedTrack.id === track.id
      )) {
      return;
    } 

    let temp = this.state.playlist;
    temp.push(track);

    this.setState({
      playlist: temp
    });
    console.log(this.state);
  }

  removeTrack(track) {
    let temp = this.state.playlist.filter(
      item => item.id !== track.id);
    this.setState({
      playlist: temp
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlist.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({
        searchResults: results
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <Playlist 
              playlist={this.state.playlist}
              onAdd={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App