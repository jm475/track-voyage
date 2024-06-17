import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ListItem from './listItem';
import './API.css';

const API = ({ token }) => {
    // State to store user data
    const [userData, setUserData] = useState(null);
    // State to store track names
    const [trackNamesHook, setTrackNamesHook] = useState([])
    
    const [trackArtistHook, setTrackArtistHook] = useState([])
    
    const [trackImagesHook, setTrackImagesHook] = useState([])

    const [trackLinksHook, setTrackLinksHook] = useState([])

    const [trackPreviewUrlsHook, setTrackPreviewUrlsHook] = useState([])


    // Define three different URL variables with different time ranges
    const shortTermUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50';
    const mediumTermUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50';
    const longTermUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50';
  

    // Function to fetch user's top tracks
    const fetchUserTracks = async (url) => {
        // Make an API request to get user's top tracks
        axios.get(url, {
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
            populateTrackImagesHook(response.data);
            populateTrackLinksHook(response.data);
            populateTrackPreviewUrlsHook(response.data);
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
            // Assuming the "images" field contains an array of image objects within "album"
            const images = track.album.images;
            // Select the highest resolution image (the first one in the array)
            return images[0].url;
          });
          // Update state with new track images
          setTrackImagesHook(trackImages); 
        } catch (error) {
          // Log any errors that occur during the population of track images
          console.error('Error populating track images:', error);
        }
      }
      

      // Function to populate track images hook
      function populateTrackLinksHook(userData) {
        try {
            // Extract the track URLs from each track in the user data
            const trackUrls = userData.items.map(track => {
              // Assuming the "external_urls" field contains an object with the "spotify" URL
              return track.external_urls.spotify;
          });
          // Update state with new track links
          setTrackLinksHook(trackUrls); 

        } catch (error) {
          // Log any errors that occur during the population of track images
          console.error('Error populating track links:', error);
        }
      }

      // Function to populate track preview URLs hook
      function populateTrackPreviewUrlsHook(userData) {
        try {
          // Extract the preview URLs from each track in the user data
          const trackPreviewUrls = userData.items.map(track => {
            // Assuming the "preview_url" field contains the track preview URL
            return track.preview_url;
          });
          // Update state with new track preview URLs
          setTrackPreviewUrlsHook(trackPreviewUrls); 
        } catch (error) {
          // Log any errors that occur during the population of track preview URLs
          console.error('Error populating track preview URLs:', error);
        }
      }


      // Function to play audio preview when hovering over a list item
      function playAudioPreview() {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.play();
      }

      // Function to stop playing audio preview
      function stopAudioPreview() {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }


      // Set up event listeners for eahc list item in useEffect
      useEffect(() => {
        const listItems = document.querySelectorAll('.list-item-test');

        listItems.forEach(item => {
          item.addEventListener('mouseenter', playAudioPreview);
          item.addEventListener('mouseleave', stopAudioPreview);
        });

        // Cleanup event listeners when component unmounts
        return () => {
          listItems.forEach(item => {
            item.removeEventListener('mouseenter', playAudioPreview);
            item.removeEventListener('mouseleave', stopAudioPreview);
          });
        };
      }, []); // Empty dependency array to run effect only once on mount

  };



  return (
    <div className="container">
      <div id="button-container">
        {/* Button to fetch top tracks for short term */}
        <button id="top-tracks-4-weeks" onClick={() => fetchUserTracks(shortTermUrl)}>Top Tracks (Last 4 Weeks)</button>
        {/* Button to fetch top tracks for medium term */}
        <button id="top-tracks-6-months" onClick={() => fetchUserTracks(mediumTermUrl)}>Top Tracks (Last 6 Months)</button>
        {/* Button to fetch top tracks for long term */}
        <button id="top-tracks-12-months" onClick={() => fetchUserTracks(longTermUrl)}>Top Tracks (Last 12 Months)</button>
      </div>
     
       {trackNamesHook.map((trackName, index) => (
                <ListItem
                    key={index}
                    number={index + 1}
                    trackNameLS={trackName}
                    trackArtistLS={trackArtistHook[index]}
                    image={trackImagesHook[index]}
                    link={trackLinksHook[index]}
                    preview={trackPreviewUrlsHook[index]}                              
                />
            ))}

    </div>
  );
};

export default API;
