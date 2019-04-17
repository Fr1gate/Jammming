import React from 'react'
import './Tracklist.css'
import Track from '../Track/Track.js'

export default class Tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {console.log(this.props.tracks)}
                {this.props.tracks.map(track => {
                    return (
                        <Track
                        key={track.id} 
                        track={track} 
                        isRemoval={this.props.isRemoval}
                        onAdd={this.props.onAdd}/>
                    )
                })}
                {console.log('TrackList renderded')}
            </div>
        )
    }
}

Tracklist.defaultProps = {
    tracks: [
        {
            name: 'default Name',
            artist: 'default Artist',
            album: 'default Album',
            id: 'default ID'
        }
    ]
}