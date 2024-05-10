import React from 'react';
import '../styles/VehicleDetailsModal.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const VehicleDetailsModal = ({ vehicle, onClose }) => {
  const navigate = useNavigate();

  const handleTestDrive = () => {
    navigate('/about-us', { state: { message: `Quisiera reservar un test drive para el ${vehicle.brand.name} ${vehicle.model} del ${vehicle.year}` } });
  };    
  if (!vehicle) return null;

    const handleBackdropClick = (event) => {
        // Asegúrate de que solo se cierra si se hace clic en el backdrop, no en el contenido del modal
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">×</button>
                <img src={vehicle.imageURL || '/path/to/default/image.jpg'} alt={vehicle.model} className="modal-image" />
                <div className="modal-details">
                    <h2>{vehicle.model} - {vehicle.year}</h2>
                    <p><strong>Marca:</strong> {vehicle.brand.name}</p>
                    <p><strong>Categoría:</strong> {vehicle.category.name}</p>
                    <p><strong>Precio:</strong> ${vehicle.price.toLocaleString()}</p>
                    <p><strong>Descripción:</strong> {vehicle.description || "No disponible"}</p>
                    <button onClick={handleTestDrive} className="test-drive-button">Reservar Test Drive</button>                </div>
            </div>
        </div>
    );
};

export default VehicleDetailsModal;
