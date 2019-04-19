//for privacy
//import {SpotifyId} from './SpotifyId.js'

const clientID = "a95d5b29ba8e42b3b73a0a4bc23f1535";
const redirectURI = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
    getAccessToken() {
        if(accessToken)
          return accessToken;
        else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
        {
          accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
          expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      
          window.setTimeout(() => accessToken = '', expiresIn*1000);
          window.history.pushState('Access Token', null, '/');
      
          return accessToken;
        }
        else
        {
          let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = url;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        const req = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, req)
            .then(response => {
                return response.json()
            })
            .then(jsonResponse => {
                if (!jsonResponse.tracks.items) {
                    return []
                } else {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            id: track.id,
                            uri: track.uri
                        }
                    })
                }
            })
        
    },

    savePlaylist(playlistName, tracksUris) {
        if (!playlistName || !tracksUris) {
            return;
        } else {
            if (!accessToken) {
                accessToken = this.getAccessToken();
            }
            const headers = {Authorization: `Bearer ${accessToken}`};
            let userID;
            fetch('https://api.spotify.com/v1/me', {headers: headers})
                .then(response => {
                    return response.json();
                }).then(jsonResponse => {
                    userID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName})
                    })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        console.log(jsonResponse);
                        const playlistID = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({uris: tracksUris})
                        })
                    })
                })
        }
    }
}

export default Spotify;