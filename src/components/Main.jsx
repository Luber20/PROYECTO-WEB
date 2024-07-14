import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import historiaClinicaImage from '../assets/Historia-clinica.png'; // Asegúrate de tener esta imagen en la ruta correcta
import Header from './Header'; // Importa tu componente de Header

const Main = () => {
    return (
        <div>
        <Header />
        <div className='main-container'>
           
            <main className='content'>
                <div className='image-container'>
                    <img src={historiaClinicaImage} alt="Historia Clínica" className='main-image' />
                </div>
                <div className='info-container'>
                    <h1>Bienvenido a la Gestión de Historias Clínicas</h1>
                    <p>Accede a las historias clínicas de manera rápida y sencilla.</p>
                    <p>Gestiona citas, actualiza información de pacientes y más.</p>
                    <Link to="/Lista" className='boton-main'>
                        Ver Lista de Pacientes
                    </Link>
                </div>
            </main>
        </div>
        </div>
    );
};

export default Main;
