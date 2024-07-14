import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid
import './Programar.css'; // Importa el archivo CSS

const Programar = () => {
  const [pacientes, setPacientes] = useState([]);
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [razonCita, setRazonCita] = useState('');
  const [detallesCita, setDetallesCita] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [ampm, setAmPm] = useState('AM');

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(storedPacientes);
  }, []);

  const handleGuardarCita = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Validación de campos
    if (nombrePaciente && telefono && razonCita && detallesCita && fecha && hora) {
      const nuevaCita = {
        id: uuidv4(), // Genera un identificador único
        paciente: nombrePaciente,
        telefono,
        razon: razonCita,
        detalles: detallesCita,
        fecha,
        hora: `${hora} ${ampm}`,
      };

      const citas = JSON.parse(localStorage.getItem('citas')) || [];
      localStorage.setItem('citas', JSON.stringify([...citas, nuevaCita]));

      // Limpiar campos después de guardar la cita
      setNombrePaciente('');
      setTelefono('');
      setRazonCita('');
      setDetallesCita('');
      setFecha('');
      setHora('');
      setAmPm('AM');

      // Redirigir a otra página o hacer alguna acción adicional si es necesario
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <div>
      <Header />
      <div className="programar-container">
        <h2>Programar Cita</h2>
        <form onSubmit={handleGuardarCita} className="form-container">
          <div className="form-group">
            <label>Nombre del Paciente:</label>
            <select
              value={nombrePaciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Seleccionar</option>
              {pacientes.map((paciente, index) => (
                <option key={index} value={paciente.nombre}>
                  {paciente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Número de Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Razón de la Cita:</label>
            <input
              type="text"
              value={razonCita}
              onChange={(e) => setRazonCita(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Detalles de la Razón de la Cita:</label>
            <textarea
              value={detallesCita}
              onChange={(e) => setDetallesCita(e.target.value)}
              className="form-control"
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Hora:</label>
            <div className="time-input">
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="form-control time-control"
                required
              />
              <select
                value={ampm}
                onChange={(e) => setAmPm(e.target.value)}
                className="form-control ampm-control"
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-programar">
            Programar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Programar;
