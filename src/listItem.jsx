import React, {useState} from 'react';

/**
 * ListItem component skeleton for track data to be input into
 * @param {} param0 
 * @returns 
 */
const ListItem = ({ number, trackNameLS, trackArtistLS, image, link, preview}) => {


    const [isHovered, setIsHovered] = useState(false);

    const isPreviewAvailable = !!preview; // Check if preview is available

    const playAudioPreview = () => {
      const audioPlayer = document.getElementById('audio-player');
      audioPlayer.src = preview;
      audioPlayer.play();
    };
  
    const stopAudioPreview = () => {
      const audioPlayer = document.getElementById('audio-player');
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    };


    return (
        <div className="list-item"
        onMouseEnter={() => {
            setIsHovered(true);
            playAudioPreview();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            stopAudioPreview();
          }}
        >
            <p className="number">{number}</p>
            <div className="list-item-text">
                <p className="track-name">{trackNameLS}</p>
                <p className="track-artist">{trackArtistLS}</p>
            </div>
            {isPreviewAvailable && <i class="bi bi-music-note-beamed"></i>}
            <img className="track-image" src={image} alt="Image"/>
            <a className="track-link" href={link} target="_blank">
                <i class="bi bi-spotify"></i>
            </a>
            <audio id="audio-player" className="track-preview" src={preview}></audio>
        </div>
    );
};

export default ListItem;
