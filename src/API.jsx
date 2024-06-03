import React, { useState } from 'react';
import axios from 'axios';

const API = ({ token }) => {
    // State to store user data
    const [userData, setUserData] = useState(null);
    // State to store track names
    const [trackNamesHook, setTrackNamesHook] = useState([])


    // Function to fetch user's top tracks
    const fetchUserTracks = () => {
        // Make an API request to get user's top tracks
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then(response => {
            // Update the state with the user data
            setUserData(response.data);
            // Populate track names hook with the fetched data
            populateTrackNamesHook(response.data);
        })
        .catch(error => {
            // Log any errors that occur during the API request
            console.error('Error fetching user profile:', error);
        });


        // Function to populate track names hook
        function populateTrackNamesHook(userData) {
            try {
                // Extract track names from user data
                const trackNames = userData.items.map(track => track.name);
                // Update state with new track names
                setTrackNamesHook(trackNames); 

            } catch (error) {
                // Log any errors that occur during the population of track names
                console.error('Error populating track names:', error);
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
                {/* Display the track names */}
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
