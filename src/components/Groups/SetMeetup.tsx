"use client"

import React, { useState } from 'react';
import './SetMeetup.css';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import Walking from '@/drawings/Walking';

export default function SetMeetup() {
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [walkingDistance, setWalkingDistance] = useState(100);
    const [markerLocation, setMarkerLocation] = useState({
        lat: 49.2791,
        lng: -122.9202,
      });

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const address = event.target.value;
        // get lat lng and update markerLocation

    };

    return (
        <div className="wrapper">
            <h1>Set a meetup area</h1>
            <p>We’ll suggest restaurants that are in your group’s area</p>

            <h2>Enter Address</h2>
            <input type="text" placeholder="ex. your office area" onChange={handleAddressChange}/>

            <APIProvider apiKey={'AIzaSyDicc-hraW0CWUW4j4eRkRCCb9ODTeonzc'} onLoad={() => console.log('Maps API has loaded.')}>
                <div className='map-container'>
                    <Map
                        defaultCenter={markerLocation}
                        defaultZoom={13}
                        gestureHandling={'greedy'}
                        disableDefaultUI
                    />
                    <Marker position={markerLocation} />
                </div>
            </APIProvider>
            
            <p className='map-text'>Pinch and drag to adjust the location and radius</p>

            <div className='capsule-wrapper'>
                <Walking />
                <p className='distance-text'>{walkingDistance}m</p>
            </div>

            <button className='primary-button' disabled={isNextDisabled}>Confirm</button>
        </div>
    );
}