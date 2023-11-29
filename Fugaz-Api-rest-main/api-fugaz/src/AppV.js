import logo from './logo.svg';
import './App.css';
import ListaVenta from './VListarVenta';
import AgregarVenta from './VAgregarVenta';
import EditarVenta from './VEditarVenta';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/VListarventa' element={<ListaVenta />} exact></Route>
          <Route path='/agregarventa' element={<AgregarVenta />} exact></Route>
          <Route path='/editarventa/:idsale' element={<EditarVenta />} exact ></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
