import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/login'
import Registro from './components/Registro'
import Lista from './components/Lista'
import Agregar from './components/Agregar'
import Programar from './components/Programar'
import Historial from './components/Historial'
import Perfil from './components/Perfil'
import Main from './components/Main'
import Editar from './components/Editar'
import Citas from './components/Citas'
import Actualizar from './components/Actualizar';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Lista' element={<Lista />} />
        <Route path='/Agregar' element={<Agregar />} />
        <Route path='/Programar' element={<Programar />} />
        <Route path='/Historial/:nombrePaciente' element={<Historial />} />
        <Route path='/Perfil/:id' element={<Perfil />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/Editar/:id' element={<Editar />} />
        <Route path='/Citas' element={<Citas />} />
        <Route path='/Actualizar/:id' element={<Actualizar />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;