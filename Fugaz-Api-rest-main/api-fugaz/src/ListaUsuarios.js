import React, { useEffect, useState } from 'react';
import UsuarioIndividual from './UsuarioIndividual';
import BarraBusqueda from './BarraBusqueda';
import styled from 'styled-components';
import axios from 'axios';
import './style.css';

const CardHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;
function ListaUsuarios() {
  const [datausuarios, setdatausuario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get('/api/usuario/obtenerusuarios').then((res) => {
      console.log(res);
      setdatausuario(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleBusqueda = (busqueda) => {
    setSearchTerm(busqueda.toLowerCase());
    setIsSearching(true);
  };

  const filteredUsuarios = datausuarios.filter((usuario) => {
    const nombreRol = usuario.name_rol.toLowerCase();
    const nombreUsuario = usuario.name_user.toLowerCase();
    const fechaRegistro = usuario.date_register.toLowerCase();
    return (
      nombreRol.includes(searchTerm) ||
      nombreUsuario.includes(searchTerm) ||
      fechaRegistro.includes(searchTerm)
    );
  });

  //mapeo de la lista
  const listausuarios = (isSearching ? filteredUsuarios : datausuarios).map((usuario) => (
    <div key={usuario.iduser}>
      <UsuarioIndividual usuario={usuario} />
    </div>
  ));

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <div className="search">
        <BarraBusqueda onBuscar={handleBusqueda} />
      </div>
      <br />
      <button
        className="agr btn btn-outline-light"
        onClick={() => { window.location = 'agregarusuario'; }}
      >
        Agregar Usuario
      </button>   
      <div className="usuarios-lista">
        {listausuarios.length ? listausuarios : <p>No se encontraron resultados</p>}
      </div>
    </div>
  );
}

export default ListaUsuarios;
