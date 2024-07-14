import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Citas.css';
import Header from './Header';

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(storedCitas);
  }, []);

  const eliminarCita = (id) => {
    const updatedCitas = citas.filter(cita => cita.id !== id);
    setCitas(updatedCitas);
    localStorage.setItem('citas', JSON.stringify(updatedCitas));
  };

  return (
    <div>
        <Header />
    <div className="citas-container">
      <h2>Listado de Citas</h2>
      {citas.map((cita) => (
        <div key={cita.id} className="cita-card">
          <h3>{cita.paciente}</h3>
          <p><strong>Teléfono:</strong> {cita.telefono}</p>
          <p><strong>Razón de la Cita:</strong> {cita.razon}</p>
          <p><strong>Detalles:</strong> {cita.detalles}</p>
          <p><strong>Fecha y Hora:</strong> {cita.fecha} {cita.hora}</p>
          <div className="boton-container">
            <Link to={`/Actualizar/${cita.id}`} className="link-button">Actualizar Cita</Link>
            <button onClick={() => eliminarCita(cita.id)} className="boton-eliminar">Eliminar Cita</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Citas;
