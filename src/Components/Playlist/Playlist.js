import React from 'react'
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist.js'

export default class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                {console.log(this.props.playlist)}
                <input defaultValue={'New Playlist'}/>
                <Tracklist 
                    tracks={this.props.playlist} 
                    isRemoval={true}/>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}