import React, { useEffect, useState } from 'react';
import UsuarioIndividual from './UsuarioIndividual';
import BarraBusqueda from './BarraBusqueda';
import axios from 'axios';
import styled from 'styled-components';
import './style.css';
//importar pdf
import pdf from './pdf';
//import { useState } from "react";

const Button = styled.button`
  &.btn-success {
    background-color: #28a745;
    color: #fff;
  }

  &.btn-danger {
    background-color: #dc3545;
    color: #fff;
  }

  &.d-none {
    display: none;
  }
`;

function ListaUsuarios() {
  //buscador

  const [datausuarios, setdatausuario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios
      .get('/api/usuario/obtenerusuarios')
      .then((res) => {
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
    //const estadorol = usuario.state_rol.toLowerCase();
    //const estadousuario = usuario.state_user.toLowerCase();
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
      <div className='pdf'>
        <Button
          className="agr btn btn-outline-danger"
          onClick={() => { pdf(datausuarios); }}
        >
          Generar PDF
        </Button>
      </div>
      <br />
      <br />
      <br />
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
