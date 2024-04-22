import React from 'react';
import '../styles/LaunchAnnouncements.css'; // Asegúrate de crear este archivo CSS

const LaunchAnnouncements = ({ announcements }) => {
    return (
        <div className="launch-container">
            <h2>Próximos Lanzamientos</h2>
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
