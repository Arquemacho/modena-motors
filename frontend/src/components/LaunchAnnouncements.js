import React from 'react';
import Countdown from './Countdown';  // Asegúrate de importar correctamente el componente Countdown
import '../styles/LaunchAnnouncements.css';

const LaunchAnnouncements = ({ announcements }) => {
    return (
        <div className="launch-container">
            <h2>Próximos Lanzamientos</h2>
            {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement">
                    <h3>{announcement.title}</h3>
                    <p>{announcement.description}</p>
                    <Countdown toDate={announcement.date} />
                </div>
            ))}
        </div>
    );
};

export default LaunchAnnouncements;
