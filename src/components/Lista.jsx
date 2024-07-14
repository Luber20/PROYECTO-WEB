import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './lista.css'; 

const Lista = () => {
  const [pacientes, setPacientes] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(storedPacientes);
    setIdCounter(storedPacientes.length + 1);
  }, []);

  const handleAgregarPaciente = () => {
    const newPaciente = {
      id: `${idCounter.toString().padStart(2, '0')}`, 
      nombre,
      edad,
      genero,
      ciudad,
    };

    const updatedPacientes = [...pacientes, newPaciente];
    setPacientes(updatedPacientes);
    localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
    setIdCounter(idCounter + 1);
    setNombre('');
    setEdad('');
    setGenero('');
    setCiudad('');
  };

  const handleEliminarPaciente = (id) => {
    const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(updatedPacientes);
    localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
  };

  return (
    <div>
      <Header />
      <div className="lista-container">
        <h2>Lista de Pacientes</h2>
        <div className="link-button"> 
          <Link to="/Agregar">
            <button>Agregar Paciente</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Ciudad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr key={index}>
                <td>{paciente.id}</td>
                <td>
                  <Link className='nombre-link' to={`/Perfil/${paciente.id}`}>{paciente.nombre}</Link>
                </td>
                <td>{paciente.edad}</td>
                <td>{paciente.genero}</td>
                <td>{paciente.ciudad}</td>
                <td>
                  <div className="link-button"> 
                    <Link to={`/historial/${paciente.nombre}`}>
                      <button className="link-button">Historial</button>
                    </Link>
                  </div>
                  <div className="link-button"> 
                    <button className="link-button" onClick={() => handleEliminarPaciente(paciente.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lista;
