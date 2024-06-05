import React from 'react';

/**
 * ListItem component skeleton for track data to be input into
 * @param {} param0 
 * @returns 
 */
const ListItem = ({ number, trackNameLS, trackArtistLS, image, icon }) => {
    return (
        <div className="list-item-test">
            <p className="number">{number}</p>
            <div className="list-item-text">
                <p className="track-name">{trackNameLS}</p>
                <p className="track-artist">{trackArtistLS}</p>
            </div>
            <img className="track-image" src={image} alt="Image"/>
            <a className="track-link"><i class="bi bi-spotify"></i></a>
        </div>
    );
};

export default ListItem;
