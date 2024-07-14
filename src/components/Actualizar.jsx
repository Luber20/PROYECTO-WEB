import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Actualizar.css';
import Header from './Header';

const Actualizar = () => {
  const { id } = useParams();
  const [cita, setCita] = useState({
    paciente: '',
    telefono: '',
    razon: '',
    detalles: '',
    fecha: '',
    hora: '',
  });
  const [ampm, setAmPm] = useState('AM');

  useEffect(() => {
    const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaToUpdate = storedCitas.find(cita => cita.id === id);
    if (citaToUpdate) {
      setCita(citaToUpdate);
      const [hora, ampm] = citaToUpdate.hora.split(' ');
      setCita(prevState => ({ ...prevState, hora }));
      setAmPm(ampm);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCita(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCitas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaIndex = updatedCitas.findIndex(cita => cita.id === id);
    if (citaIndex !== -1) {
      updatedCitas[citaIndex] = { ...cita, hora: `${cita.hora} ${ampm}` };
      localStorage.setItem('citas', JSON.stringify(updatedCitas));
      // Redirigir a la página de citas
      window.location.href = '/citas';
    }
  };

  return (
    <div>
      <Header />
      <div className="actualizar-container">
        <h2>Actualizar Cita</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Nombre del Paciente:</label>
            <input
              type="text"
              name="paciente"
              value={cita.paciente}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Número de Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={cita.telefono}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Razón de la Cita:</label>
            <input
              type="text"
              name="razon"
              value={cita.razon}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Detalles de la Razón de la Cita:</label>
            <textarea
              name="detalles"
              value={cita.detalles}
              onChange={handleInputChange}
              className="form-control"
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={cita.fecha}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Hora:</label>
            <div className="time-input">
              <input
                type="time"
                name="hora"
                value={cita.hora}
                onChange={handleInputChange}
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
          <div className="boton-container">
            <button type="submit" className="boton-guardar">
              Actualizar
            </button>
            <Link to="/citas" className="boton-volver">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Actualizar;
