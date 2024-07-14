import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Agregar.css'; // Importa el archivo CSS

const Agregar = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [genero, setGenero] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [alergias, setAlergias] = useState('');
  const [antecedentes, setAntecedentes] = useState('');
  const [imagen, setImagen] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la alerta
  const [cedulaValida, setCedulaValida] = useState(true); // Estado para validar cédula

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Función para validar cédula
  const validarCedula = (cedula) => {
    if (cedula.length !== 10 || !/^\d+$/.test(cedula)) {
      return false;
    }

    const ultimoDigito = Number(cedula[9]);
    const sumaPares = Number(cedula[1]) + Number(cedula[3]) + Number(cedula[5]) + Number(cedula[7]);
    let sumaImpares = 0;

    for (let i = 0; i < 9; i += 2) {
      const digito = Number(cedula[i]) * 2;
      sumaImpares += digito > 9 ? digito - 9 : digito;
    }

    const total = sumaPares + sumaImpares;
    const residuo = total % 10;
    const digitoVerificador = residuo === 0 ? 0 : 10 - residuo;

    return digitoVerificador === ultimoDigito;
  };

  const handleAgregarPaciente = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Validar que todos los campos estén llenos
    if (
      nombre &&
      edad &&
      fechaNacimiento &&
      cedula &&
      genero &&
      ciudad &&
      estadoCivil &&
      telefono &&
      email &&
      tipoSangre &&
      alergias &&
      antecedentes &&
      imagen
    ) {
      if (!validarCedula(cedula)) {
        setCedulaValida(false);
        return;
      }

      // Obtener la lista de pacientes del localStorage o inicializarla vacía
      const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

      // Crear un nuevo paciente con los datos ingresados
      const newPaciente = {
        id: `${pacientes.length + 1}`.padStart(2, '0'), // Generar un ID numérico
        nombre,
        edad,
        fechaNacimiento,
        cedula,
        genero,
        ciudad,
        estadoCivil,
        telefono,
        email,
        tipoSangre,
        alergias,
        antecedentes,
        imagen,
      };

      // Actualizar la lista de pacientes
      localStorage.setItem('pacientes', JSON.stringify([...pacientes, newPaciente]));

      // Limpiar los campos después de agregar el paciente
      setNombre('');
      setEdad('');
      setFechaNacimiento('');
      setCedula('');
      setGenero('');
      setCiudad('');
      setEstadoCivil('');
      setTelefono('');
      setEmail('');
      setTipoSangre('');
      setAlergias('');
      setAntecedentes('');
      setImagen(null);

      // Redirigir a la lista después de agregar el paciente
      window.location.href = '/Lista'; // Redirige manualmente usando window.location
    } else {
      setShowAlert(true); // Mostrar alerta si algún campo está vacío
    }
  };

  // Función para cerrar la alerta
  const handleCloseAlert = () => {
    setShowAlert(false);
    setCedulaValida(true);
  };

  // Función para verificar si todos los campos están llenos
  const isFormValid =
    nombre &&
    edad &&
    fechaNacimiento &&
    cedula &&
    genero &&
    ciudad &&
    estadoCivil &&
    telefono &&
    email &&
    tipoSangre &&
    alergias &&
    antecedentes &&
    imagen;

  return (
    <div>
      <Header />
      <div className="agregar-container">
        <h2>Agregar Paciente</h2>
        <form onSubmit={handleAgregarPaciente} className="form-container">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Edad:</label>
            <input
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Cédula:</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="form-control"
              required
            />
            {!cedulaValida && <p className="error-text">Cédula no válida.</p>}
          </div>
          <div className="form-group">
            <label>Género:</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ciudad:</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Estado Civil:</label>
            <select
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Seleccionar</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viudo">Viudo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Número de Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo de Sangre:</label>
            <input
              type="text"
              value={tipoSangre}
              onChange={(e) => setTipoSangre(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Alergias:</label>
            <input
              type="text"
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Antecedentes Familiares:</label>
            <input
              type="text"
              value={antecedentes}
              onChange={(e) => setAntecedentes(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Imagen:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="form-control"
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn-agregar" disabled={!isFormValid}>
            Agregar
          </button>
        </form>
        {showAlert && (
          <div className="alert-container">
            <p>Por favor, complete todos los campos.</p>
            <button onClick={handleCloseAlert}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agregar;
