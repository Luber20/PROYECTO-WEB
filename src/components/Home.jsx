import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './Home.css';

function Index() {
  return (
    <body className='index'>
      

    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Bienvenido a Historias Clínicas</h1>
          <p className="app-description">Una solución integral para la gestión de historias clínicas.</p>
          <Link to={'/Login'}><a className="btn">Inicia Sesión</a></Link>
        </div>
      </header>
      <main className="app-main" id="features">
        <section className="features-section">
          <div className="feature">
            <h2>Registro Fácil</h2>
            <p>Registra y administra historias clínicas de manera eficiente.</p>
          </div>
          <div className="feature">
            <h2>Acceso Seguro</h2>
            <p>Protege la información sensible de tus pacientes con seguridad avanzada.</p>
          </div>
          <div className="feature">
            <h2>Interfaz Intuitiva</h2>
            <p>Una interfaz fácil de usar diseñada para profesionales de la salud.</p>
          </div>
        </section>
      </main>
    </div>
    </body>
  );
}

export default Index;
