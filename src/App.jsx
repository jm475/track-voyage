import { useState, useEffect } from 'react'
import './App.css'
import { login, getToken } from './Auth';
import API from './API';
function App() {

  // State variable to store the authentication token
  const [token, setToken] = useState(null);

  
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
    return (
    <div className="container">
      <h1 id="home-title" className="home-text">Welcome to TrackVoyage</h1>
      <h2 className="home-text">Discover your top tracks and dive into your music journey</h2>
      <p className="home-text2">With TrackVoyage, you can:</p>
      <p className="home-text2">View your top tracks from 3 different time periods</p>
      <button id="login" onClick={login}>Login with Spotify</button>
    </div>
    )
    
    
  }

  // If token is present, render the API component and pass the token as prop
  return <API token={token} />;
};

  
export default App;
