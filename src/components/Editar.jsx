import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import './Editar.css';

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nombre: '',
    edad: '',
    fechaNacimiento: '',
    cedula: '',
    genero: '',
    ciudad: '',
    estadoCivil: '',
    telefono: '',
    email: '',
    tipoSangre: '',
    alergias: '',
    antecedentes: '',
    imagen: ''
  });

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const pacienteEncontrado = storedPacientes.find(p => p.id === id);
    if (pacienteEncontrado) {
      setPaciente(pacienteEncontrado);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaciente(prevState => ({
        ...prevState,
        imagen: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const updatedPacientes = storedPacientes.map(p => p.id === id ? paciente : p);
    localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
    navigate(`/Perfil/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="editar-container">
        <h2>Editar Paciente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={paciente.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edad">Edad</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={paciente.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={paciente.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={paciente.cedula}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genero">Género</label>
            <select
              id="genero"
              name="genero"
              value={paciente.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={paciente.ciudad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estadoCivil">Estado Civil</label>
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={paciente.estadoCivil}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Número de Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={paciente.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={paciente.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipoSangre">Tipo de Sangre</label>
            <input
              type="text"
              id="tipoSangre"
              name="tipoSangre"
              value={paciente.tipoSangre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="alergias">Alergias</label>
            <input
              type="text"
              id="alergias"
              name="alergias"
              value={paciente.alergias}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="antecedentes">Antecedentes Familiares</label>
            <input
              type="text"
              id="antecedentes"
              name="antecedentes"
              value={paciente.antecedentes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Foto de perfil</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
            />
            {paciente.imagen && <img src={paciente.imagen} alt="Foto de perfil" className="preview-imagen" />}
          </div>
          <div className="boton-container">
            <button type="submit" className="boton-guardar">Guardar</button>
            <Link to={`/Perfil/${id}`} className="boton-volver">Volver</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editar;
