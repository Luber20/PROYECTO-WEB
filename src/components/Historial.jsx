import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import './Historial.css'; // Importa el archivo CSS

const Historial = () => {
  const { nombrePaciente } = useParams(); // Obtener el nombre del paciente de los parámetros de la URL
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Obtener todas las citas del localStorage
    const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];

    // Filtrar las citas por el nombre del paciente
    const citasFiltradas = storedCitas.filter((cita) => cita.paciente === nombrePaciente);
    setCitas(citasFiltradas);
  }, [nombrePaciente]); // Actualizar cuando cambie el nombre del paciente

  return (
    <div>
      <Header />
      <div className="historial-container">
        <h2>Historial de Citas de {nombrePaciente}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Razón</th>
              <th>Detalles</th>
              <th>Número de Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.razon}</td>
                <td>{cita.detalles}</td>
                <td>{cita.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
