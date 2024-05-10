import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe. Intentalo nuevamente, o ponte en contacto con nosotros para solucionar tu inconveniente.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;
