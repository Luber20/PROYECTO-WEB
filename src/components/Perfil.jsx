import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import './Perfil.css';

const Perfil = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const pacienteEncontrado = storedPacientes.find(p => p.id === id);
    if (pacienteEncontrado) {
      setPaciente(pacienteEncontrado);
    }
  }, [id]);

  if (!paciente) {
    return (
      <div>
        <Header />
        <div className="perfil-container">
          <h2>Paciente no encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="perfil-container">
        <div className="perfil-header">
          <h2>Perfil del Paciente</h2>
          <div className="foto-container">
            <img src={paciente.imagen || 'ruta/imagen/por/defecto.jpg'} alt="Foto de perfil" className="foto-perfil" />
          </div>
        </div>
        <div className="info-container">
          <div className="info-section left">
            <p><strong>ID:</strong> {paciente.id}</p>
            <p><strong>Nombre:</strong> {paciente.nombre}</p>
            <p><strong>Edad:</strong> {paciente.edad}</p>
            <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
            <p><strong>Cédula:</strong> {paciente.cedula}</p>
            <p><strong>Género:</strong> {paciente.genero}</p>
            <p><strong>Ciudad:</strong> {paciente.ciudad}</p>
          </div>
          <div className="info-section right">
            <p><strong>Estado Civil:</strong> {paciente.estadoCivil}</p>
            <p><strong>Número de Teléfono:</strong> {paciente.telefono}</p>
            <p><strong>Correo Electrónico:</strong> {paciente.email}</p>
            <p><strong>Tipo de Sangre:</strong> {paciente.tipoSangre}</p>
            <p><strong>Alergias:</strong> {paciente.alergias}</p>
            <p><strong>Antecedentes Familiares:</strong> {paciente.antecedentes}</p>
          </div>
        </div>
        <div className="boton-container">
          <Link to={`/editar/${paciente.id}`} className="boton-editar">
            Editar
          </Link>
          <Link to={`/historial/${paciente.nombre}`} className="boton-editar">
            Historial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
