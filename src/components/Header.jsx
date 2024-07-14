import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/Logo.png'; // Importa el logo (asegúrate de que la ruta sea correcta)

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
      <Link to="/Main">
        <img src={logo} alt="Logo" className="header-logo" />
        </Link>
        <Link to="/Main" className="header-link">
          Historias Clinicas
        </Link>
      </div>
      <div className="header-right">
      <Link to="/Lista" className="header-link">
          Pacientes
        </Link>
        <Link to="/Programar" className="header-link">
          Programar Cita
        </Link>
        <Link to="/Citas" className="header-link">
          Citas
        </Link>
        <Link to="/" className="header-link">
          Cerrar Sesión
        </Link>
      </div>
    </header>
  );
};

export default Header;
