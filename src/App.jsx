import { useState, useEffect } from 'react'
import './App.css'
import { login, getToken } from './Auth';
import API from './API';
function App() {

  // State variable to store the authentication token
  //const [token, setToken] = useState(null);

  // State variable to store the authentication token
  const [token, setToken] = useState(localStorage.getItem('spotify_token'));

  // useEffect hook to handle authentication flow
  useEffect(() => {
    // Extract authorization code from URL parameters
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    // If authorization code is present, exchange it for an access token
    if (code) {
      getToken(code).then((token) => {

        // Set the token in the state
        setToken(token);

        // Store the token in localStorage
        localStorage.setItem('spotify_token', token); 
        
        // Clean up URL by removing the code query parameter
        window.history.pushState({}, null, '/'); 
      });
    }
  }, []);

  // If token is not present, render a button to initiate login process
  if (!token) {
    return <button onClick={login}>Login to Spotify</button>;
  }

  // If token is present, render the API component and pass the token as prop
  return <API token={token} />;
};

  
export default App;
