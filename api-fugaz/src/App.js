//import logo from './logo.svg';
import './App.css';
import Login from './Login';
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
      <center>
      <nav className="">
        <div className="">
          {/*<img src={logo} alt="" width="30" height="24"></img>*/}
          <div className="" id="navbarSupportedContent">
            <ul className="">
              <li className="">
                <a className="" href="ListaUsuarios">Listar Usuarios</a>
              </li>
              <li className="">
                <a className="" href="listaCompra">Lista Compras</a>
              </li>
               <li className="">
                <a className="" href="listaVenta">Lista Venta</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr></hr>
      </center>

      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path='/ListaUsuarios' element={<ListaUsuarios />} exact></Route>
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
      <center>
      <hr></hr>
      <footer className="">
        <div className="">
          <span>&copy; 2023 Fugaz Retro</span>
        </div>
      </footer>
      </center>
    </div>

  );
}

export default App;
