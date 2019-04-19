import React from 'react'
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist.js'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input 
                    defaultValue={'New Playlist'} 
                    onChange={this.handleNameChange}/>
                <Tracklist 
                    tracks={this.props.playlist} 
                    isRemoval={true}
                    onAdd={this.props.onAdd}/>
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

Playlist.defaultProps = {
    playlist: [{}]
}