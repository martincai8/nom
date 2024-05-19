"use client"
import React, { useState } from 'react';
import './GroupName.css';
import GroupName from '@/drawings/GroupName';

export default function Profile() {
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    return (
        <div className="wrapper">
            <GroupName />
            <h1>Name your Group</h1>
            <input type="text" placeholder="Group Name" />
            <button className='primary-button' disabled={isNextDisabled}>Next</button>
        </div>
    );
}