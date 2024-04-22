// En src/components/WelcomeBanner.js
import React from 'react';
import videoCar from '../../public/images/CarVideo.mp4'; // Ruta al vídeo del coche

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <video autoPlay loop muted>
        <source src={videoCar} type="video/mp4" />
      </video>
      <div className="welcome-message">
        <h1>Bienvenido a Modena Motors</h1>
      </div>
    </div>
  );
};

export default WelcomeBanner;
