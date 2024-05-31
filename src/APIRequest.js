const clientId = "3f82361276a547519ebc34ef0c594a5c";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
export var trackNames = [];


if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const tracks = await fetchTracks(accessToken);
    populateUI(tracks);
}   



/**
 * Display the popup to give the application access to user data,
 * Create a new URLSearchParams object and add the scope parameters to it
 * @param {*} clientId 
 */
async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    // Redirect uri is the URL that Spotify will redirect back to after the user authorizes the application
    //  In this case it points to the local dev server
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * Helper function for redirectToAuthCodeFlow
 * @param {*} length 
 * @returns 
 */
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * Helper function for redirectToAuthCodeFlow
 * @param {*} codeVerifier 
 * @returns 
 */
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


/**
 * Uses the verifier and code returned from the callback to perform a POST to the Spotify token API
 * Uses these two values to verify the request and return an access token
 */
async function getAccessToken(clientId, code) {
    // Load verifier from local storage
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}



async function fetchTracks(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(tracks) {
    try {
        // Extracting the names of tracks
        for (var i = 0; i < tracks.items.length; i++) {
            var trackName = tracks.items[i].name;
            trackNames.push(trackName);
            }
        localStorage.setItem('trackNames', JSON.stringify(trackNames));
    } catch (error) {
        
    }
    
}
