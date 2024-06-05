import axios from 'axios';

// Spotify application credentials
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/callback';


// Spotify API endpoints
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// Function to initiate the login process
export const login = () => {
    // Redirect the user to Spotify authorization page with required parameters
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user-top-read`;
};

// Function to exchange authorization code for access token
export const getToken = async (code) => {
    // Construct the request body with required parameters
    const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    // Send a POST request to the Spotify token endpoint with the request body
    const response = await axios.post(TOKEN_ENDPOINT, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // Extract and return the access token from the response
    return response.data.access_token;
  } catch (error) {
    // Handle and log any errors that occur during the request
    console.error('Error fetching the access token:', error);
    throw error;
  }
};
