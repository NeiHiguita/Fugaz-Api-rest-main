//import logo from './logo.svg';
import './App.css';
import ListaUsuarios from './ListaUsuarios';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';
import ListaCompras from './ListaCompras';
import AgregarCompra from './AgregarCompra';
import EditarCompra from './EditarCompra';
import ListaVentas from './ListaVentas';
import AgregarVenta from './AgregarVenta';
import EditarVenta from './EditarVenta';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/*<img src={logo} alt="" width="30" height="24"></img>*/}
          <a className="navbar-brand" href="/">Crud Fugaz Retro</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">Listar Usuarios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="listaCompra">Lista Compras</a>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="listaVenta">Lista Venta</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListaUsuarios />} exact></Route>
          <Route path='/agregarusuario' element={<AgregarUsuario />} exact></Route>
          <Route path='/editarusuario/:iduser' element={<EditarUsuario />} exact ></Route>       
          <Route path='/listacompra' element={<ListaCompras />} exact></Route>
          <Route path='/agregarcompra' element={<AgregarCompra />} exact></Route>
          <Route path='/editarcompra/:idbuy' element={<EditarCompra />} exact ></Route>
          <Route path='/listaventa' element={<ListaVentas />} exact></Route>
          <Route path='/agregarventa' element={<AgregarVenta />} exact></Route>
          <Route path='/editarventa/:idsale' element={<EditarVenta />} exact ></Route>
        </Routes>
      </BrowserRouter>
      <footer className="footer mt-2 py-3 bg-dark text-white">
        <div className="container text-center">
          <span>&copy; 2023 Fugaz Retro</span>
        </div>
      </footer>
    </div>

  );
}

export default App;
