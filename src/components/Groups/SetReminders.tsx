"use client"

import React, { useState } from 'react';
import './SetReminders.css';

export default function SetReminders() {
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    return (
        <div className="wrapper">
            <h1>Set <span className="hl">reminders</span> for <span className="hl">recurring</span> meals</h1>
            <p>We’ll send your group a notification when it’s time to vote on a restaurant!</p>

            <h2>Select a time:</h2>
            <div className='box hor-wrapper'>
                <div className='ver-wrapper'>
                    <input className='time-input' />
                    <p className='time-subtext'>HOUR</p>
                </div>
                <p className='time-bigtext'>:</p>
                <div className='ver-wrapper'>
                    <input className='time-input' />
                    <p className='time-subtext'>MIN</p>
                </div>
            </div>

            <button className='primary-button' disabled={isNextDisabled}>Next</button>
            <button className='sub-button'>Skip for now</button>
        </div>
    );
}