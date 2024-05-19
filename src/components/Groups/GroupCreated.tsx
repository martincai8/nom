"use client"

import React, { useState } from 'react';
import './GroupCreated.css';
import GroupCreatedDrawing from '@/drawings/GroupCreatedDrawing';

export default function GroupCreated() {
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const groupName = "nwPlus n friends";

    return (
        <div className="wrapper">

            <GroupCreatedDrawing />

            <h1>{groupName}</h1>
            <h2>Created!</h2>

            <button className='primary-button' disabled={isNextDisabled}>Finish</button>
        </div>
    );
}