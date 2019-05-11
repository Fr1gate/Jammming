const clientID = "a95d5b29ba8e42b3b73a0a4bc23f1535";
const redirectURI = 'https://fr1gate.github.io/Jammming/';
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

    search(term, infoWindow) {
        const accessToken = this.getAccessToken();
        const req = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, req)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }                    
                else {
                    infoWindow(response.statusText);
                }
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

    savePlaylist(playlistName, tracksUris, infoWindow) {
        if (!playlistName || !tracksUris) {
            infoWindow('Add tracks and set tracklist name!')
            return;
        } else {
            if (!accessToken) {
                accessToken = this.getAccessToken();
            }
            const headers = {Authorization: `Bearer ${accessToken}`};
            let userID;
            fetch('https://api.spotify.com/v1/me', {headers: headers})
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }                    
                    else {
                        infoWindow(response.statusText);
                    }
                }).then(jsonResponse => {
                    userID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName})
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }                    
                        else {
                            infoWindow(response.statusText);
                        }
                    })
                    .then(jsonResponse => {
                        const playlistID = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({uris: tracksUris})
                        }).then(response => infoWindow(response.statusText));
                    })
                })
        }
    }
}

export default Spotify;