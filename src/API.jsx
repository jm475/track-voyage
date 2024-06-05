import React, { useState } from 'react';
import axios from 'axios';
import ListItem from './listItem';

const API = ({ token }) => {
    // State to store user data
    const [userData, setUserData] = useState(null);
    // State to store track names
    const [trackNamesHook, setTrackNamesHook] = useState([])

    const [trackArtistHook, setTrackArtistHook] = useState([])

    const [trackImagesHook, setTrackImagesHook] = useState([])

    

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
            populateTrackArtistsHook(response.data);
            //populateTrackImagesHook(response.data);
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

         // Function to populate track artists hook
         function populateTrackArtistsHook(userData) {
          try {
              // Extract track artists from user data
              const trackArtists = userData.items.map(track => {
                // Assuming the "artists" field contains an array of artist objects
                return track.artists.map(artist => artist.name).join(", ");
              });
              // Update state with new track artists
              setTrackArtistHook(trackArtists); 

          } catch (error) {
              // Log any errors that occur during the population of track artists
              console.error('Error populating track names:', error);
          }
          
      }


        // Function to populate track images hook
        function populateTrackImagesHook(userData) {
        try {
          // Extract track images from user data
          const trackImages = userData.items.map(track => {
            // Assuming the "images" field contains an array of image objects
            return track.images.map(image => image.url);
          });
          // Update state with new track images
          setTrackImagesHook(trackImages); 
        } catch (error) {
          // Log any errors that occur during the population of track images
          console.error('Error populating track images:', error);
        }
        
      }



  };



  return (
    <div className="Container">
       {/* Clear the trackNames Hook and then fetch the user tracks upon button press */}
        <button onClick={() => {setTrackNamesHook([]); fetchUserTracks(); }}>Fetch Users Top Tracks</button>

        {userData && (
          <div class="list-item">
            <ol class="custom-list" type="1">
                {/* Display the track names */}
                {trackNamesHook.map((trackName, index) => (<li key={index}> {trackName}</li>))}
            </ol>
          </div>
        )}
       

       {trackNamesHook.map((trackName, index) => (
                <ListItem
                    key={index}
                    number={index + 1}
                    trackNameLS={trackName}
                    trackArtistLS={trackArtistHook[index]}
                    image={trackImagesHook[index]}
                    icon=""
                />
            ))}

    </div>
  );
};

export default API;
