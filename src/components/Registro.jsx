import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';
import logo from '../assets/Logo.png'; // Importa el logo (asegúrate de que la ruta sea correcta)

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('defecto');

    const handleRegistro = (event) => {
        event.preventDefault();
        let errores = false;

        // Realizar las validaciones aquí
        if (!validarCedula(cedula)) {
            alert('Cédula inválida, por favor ingrese una cédula válida');
            errores = true;
        }

        if (!validarEmail(correo)) {
            alert('Correo inválido, por favor ingrese otro');
            errores = true;
        }

        if (contraseña.length < 6) {
            alert('La contraseña debe contener al menos 6 caracteres');
            errores = true;
        }

        if (telefono && !validarTelefono(telefono)) {
            alert('Número de teléfono inválido, ingrese otro');
            errores = true;
        }

        if (edad && (isNaN(edad) || edad < 18)) {
            alert('Por favor ingrese una edad válida (mayor o igual a 18)');
            errores = true;
        }

        if (genero === 'defecto') {
            alert('Por favor, seleccione un género');
            errores = true;
        }

        // Si no hay errores, se guarda en localStorage
        if (!errores) {
            const userData = {
                nombre,
                cedula,
                correo,
                contraseña,
                telefono,
                edad,
                genero,
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            alert('Registro exitoso');
        }
    };

    useEffect(() => {
        // Restablecer los estados del formulario a valores iniciales al montar el componente
        setNombre('');
        setCedula('');
        setCorreo('');
        setContraseña('');
        setTelefono('');
        setEdad('');
        setGenero('defecto');
    }, []);

    // Función para validar el número de teléfono
    const validarTelefono = (telefono) => {
        const telefonoRegex = /^0[789]\d{8}$/;
        return telefonoRegex.test(telefono);
    };

    // Función para validar correo electrónico
    const validarEmail = (correo) => {
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return correoRegex.test(correo);
    };

    // Función para validar cédula
    const validarCedula = (cedula) => {
        // La lógica de validación de cédula
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

    return (
        <>
            <body>
                <header className='header-registro'>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="header-logo" />
                        </Link>
                        <Link to="/" className='Texto-head'>
                            Historias Clínicas
                        </Link>
                    </div>
                </header>

                <main>
                    <div className="cuerpo-registro">
                        <form action="" className="registrof" id="registrof" onSubmit={handleRegistro}>
                            <h2 className="t-registro">Registro</h2>
                            <div className="texto-registro">
                                <div className="izquierda-registro">
                                    <input
                                        type="text"
                                        name="nombre_registro"
                                        id="nombre"
                                        placeholder="Nombre Completo"
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="cedula_registro"
                                        id="cedula"
                                        placeholder="Número de Cédula"
                                        required
                                        value={cedula}
                                        onChange={(e) => setCedula(e.target.value)}
                                    />
                                    <input
                                        type="email"
                                        name="correo_registro"
                                        id="correo"
                                        placeholder="Correo Electrónico"
                                        required
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        name="contraseña_registro"
                                        id="contraseña"
                                        placeholder="Contraseña"
                                        required
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                    />
                                    <p className="contratexto">*La contraseña debe contener mínimo 6 caracteres*</p>
                                </div>
                                <div className="derecha-registro">
                                    <input
                                        type="text"
                                        name="telefono_registro"
                                        id="telefono"
                                        placeholder="Número de Teléfono"
                                        required
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        name="edad_registro"
                                        id="edad"
                                        placeholder="Edad"
                                        required
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                    <select
                                        name="genero_registro"
                                        id="genero"
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        required
                                    >
                                        <option value="defecto">Género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                            <button className='boton-registro' type="submit" id="registrarse">
                                Registrarse
                            </button>
                            <p className="textoregistro">
                                ¿Ya tienes una cuenta? <Link to={'/Login'}><b>Iniciar Sesión</b></Link>
                            </p>
                        </form>
                    </div>
                </main>
            </body>
        </>
    );
};

export default Registro;
