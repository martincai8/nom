"use client"

import React, { useState } from 'react';
import './AddMembers.css';
import FiSend from '@/drawings/FiSend';
import CopyLink from '@/drawings/CopyLink';

export default function AddMembers() {
    const memebers = [{key: 123, email: 'joanne.jiwoo@gmail.com', role: 'Admin'}, {key: 456, email: 'maureen.luo@gmail.com', role: 'Invited'}];
    const [isMemberAdded, setIsMemeberAdded] = useState(false);

    return (
        <div className="wrapper">
            <h1>Add Members</h1>
            <p>Invite members below or share the invite link</p>
            <div className="hor-wrapper">
                <input type="text" placeholder="Group Name" />
                <button className="button-send">
                    <FiSend />
                </button>
            </div>

            <h2>Members</h2>
            <div>
                {memebers.map((member) => (
                    <div className='member-info' key={member.key}>
                        <p>{member.email}</p>
                        <p className='secondary-text'>{member.role}</p>
                    </div>
                ))}
            </div>

            <div className='divider'></div>

            <div className='hor-wrapper'>
                <p className='secondary-text'>Anyone with the link can join</p>
                <button className='secondary-button'>
                    <div className='hor-wrapper'>
                        Copy Link
                        <CopyLink />
                    </div>
                </button>
            </div>

            <button className='primary-button' disabled={!isMemberAdded}>Next</button>
        </div>
    );
}