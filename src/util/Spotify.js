// const clientId = process.env.CLIENT_ID;
const clientId = '0a2d02d4d1634caf800362448c236c82';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); 
            return accessToken;
            //access token is empty and not in URL
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },

    search(searchTerm) {

        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response) => {return response.json()})
        .then((responseAsJson) => {
            if(!responseAsJson.tracks) {
                return [];
            } 
            return responseAsJson.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken =  Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userId;

        return fetch('https://api.spotify.com/v1/me?headers', {
            headers: headers
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                body: JSON.stringify({ name: name}),
                headers: headers
            })
            .then(response => response.json())
            .then((jsonResponse) => {
                let playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris}),
                    headers : {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    playlistID = jsonResponse.id
                })
            }) 
        })
    }
}

export default Spotify;