import React from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'searchResults default Name1',
          artist: 'default Artist',
          album: 'default Album',
          id: 'searchResults default ID1'
        },
        {
          name: 'searchResults default Name2',
          artist: 'default Artist',
          album: 'default Album',
          id: 'searchResults default ID2'
        }
      ],
      playlist: [
        {
          name: 'playlist default Name1',
          artist: 'default Artist',
          album: 'default Album',
          id: 'playlist default ID1'
        },
        {
          name: 'playlist default Name2',
          artist: 'default Artist',
          album: 'default Album',
          id: 'playlist default ID2'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            {console.log(this.state.playlist)}
            <Playlist 
              playlist={this.state.playlist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App