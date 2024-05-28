import { useState, useEffect } from 'react'
import './App.css'
import {trackNames, storedtrackNames} from './APIRequest'

function App() {
  const [trackNamesHook, setTrackNamesHook] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      if(storedtrackNames) {
        setTrackNamesHook(JSON.parse(storedtrackNames));
      } else {
        try {
          localStorage.setItem('trackNames', JSON.stringify(trackNames));
          setTrackNamesHook(trackNames); // Set track names to state
        } catch (error) {
          console.error('Error fetching track names:', error);
        }
      }


      
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts



  return (
    <div id="app">
    <h2>Track Names:</h2>
      <ol type="1">
        {trackNamesHook.map((trackName, index) => (
          <li key={index}> {trackName}</li>
        ))}
      </ol>
    </div>
  )
}

export default App
