import { useState, useEffect } from 'react'
import './App.css'
import { login, getToken } from './Auth';
import API from './API';
function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      getToken(code).then((token) => {
        setToken(token);
        window.history.pushState({}, null, '/'); // Clean up URL
      });
    }
  }, []);

  if (!token) {
    return <button onClick={login}>Login to Spotify</button>;
  }

  return <API token={token} />;
};

  
export default App;
