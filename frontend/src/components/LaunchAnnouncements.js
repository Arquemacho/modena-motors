import React from 'react';
import '../styles/LaunchAnnouncements.css';

const LaunchAnnouncements = ({ announcements }) => {
    return (
        <div className="launch-announcements">
            {announcements.map(announcement => (
                <div key={announcement.id} className="announcement">
                    <h3>{announcement.title}</h3>
                    <p>{announcement.description}</p>
                </div>
            ))}
        </div>
    );
};

export default LaunchAnnouncements;
