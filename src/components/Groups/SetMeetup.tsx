'use client';

import React, { useState } from 'react';
import './SetMeetup.css';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Walking from '@/drawings/Walking';

export default function SetMeetup() {
	const [isNextDisabled, setIsNextDisabled] = useState(false);
	const [walkingDistance, setWalkingDistance] = useState(100);
	const [address, setAddress] = useState('');
	const [markerLocation, setMarkerLocation] = useState({
		lat: 49.2791,
		lng: -122.9202,
	});

	const onEnter = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/geocode/coordinates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ address }),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch coordinates');
			}

			const data = await response.json();
			const { lat, lng } = data;
			setMarkerLocation({ lat, lng });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='wrapper'>
			<h1>Set a meetup area</h1>
			<p>We&apos;ll suggest restaurants that are in your group&apos;s area</p>

			<h2>Enter Address</h2>
			<div className='hor-wrapper'>
				<input
					type='text'
					placeholder='ex. your office area'
					onChange={(e) => {
						setAddress(e.target.value);
					}}
				/>
				<button className='primary-button' onClick={onEnter}>
					Enter
				</button>
			</div>

			<APIProvider
				apiKey={process.env.GOOGLE_PLACES_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
				onLoad={() => console.log('Maps API has loaded.')}
			>
				<div className='map-container'>
					<Map
						defaultCenter={markerLocation}
						defaultZoom={13}
						gestureHandling={'greedy'}
						center={markerLocation}
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

			<button className='primary-button' disabled={isNextDisabled}>
				Confirm
			</button>
		</div>
	);
}
