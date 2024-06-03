// API.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [trackNamesHook, setTrackNamesHook] = useState([])

  const fetchUserTracks = () => {
    axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUserData(response.data);
      populateTrackNamesHook(response.data);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });



    function populateTrackNamesHook(userData) {
        try {
            const trackNames = userData.items.map(track => track.name);
            setTrackNamesHook(trackNames); // Update state with new track names

        } catch (error) {
            
        }
        
    }


    


  };

  return (
    <div className="API">
      <header className="API-header">
       {/* Clear the trackNames Hook and then fetch the user tracks upon button press */}
        <button onClick={() => {setTrackNamesHook([]); fetchUserTracks(); }}>Fetch Users Top Tracks</button>
        {userData && (
          <div>
            <ol type="1">
            {trackNamesHook.map((trackName, index) => (
          <li key={index}> {trackName}</li>
        ))}
      </ol>
          </div>
        )}
      </header>
    </div>
  );
};

export default API;
