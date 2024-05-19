"use client"

import React, { useState } from 'react';
import './SetMeetup.css';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import Walking from '@/drawings/Walking';

export default function SetMeetup() {
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [walkingDistance, setWalkingDistance] = useState(100);
    const [address, setAddress] = useState(''); 
    const [markerLocation, setMarkerLocation] = useState({
        lat: 49.2791,
        lng: -122.9202,
      });

    const handleAddressChange = () => {
        // get lat lng and update markerLocation
        
    };

    return (
        <div className="wrapper">
            <h1>Set a meetup area</h1>
            <p>We’ll suggest restaurants that are in your group’s area</p>

            <h2>Enter Address</h2>
            <div className='hor-wrapper'>
                <input type="text" placeholder="ex. your office area" onChange={(e) => {setAddress(e.target.value)}}/>
                <button className='primary-button' onChange={handleAddressChange}>Enter</button>
            </div>
            

            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''} onLoad={() => console.log('Maps API has loaded.')}>
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