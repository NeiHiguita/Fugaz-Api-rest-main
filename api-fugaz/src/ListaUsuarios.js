import React, { useEffect, useState } from 'react';
import UsuarioIndividual from './UsuarioIndividual';
import BarraBusqueda from './BarraBusqueda';
import axios from 'axios';
import styled from 'styled-components';
import './style.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import usuarioIndividual from './UsuarioIndividual';
//import { useState } from "react";


const TableCell = styled.td`
  padding: 0.5rem;
`;

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

  const [usuario, setUsuario] = useState([]);

  const generatePDFReport = () => {
    const dateGenerateReport = new Date().toDateString();

    const doc = new jsPDF({ orientation: "landscape" }); // Cambiado a "landscape"

    // Definimos las columnas de la tabla del documento
    const columns = [
      "ID",
      "Nombre de Usuario",
      "Rol",
      "Permiso",
      "Email",
      "Estado",
      "Fecha de Registro",
    ];

    // Definimos los valores de las columnas del documento
    const data = [
      [
        usuario.iduser,
        usuario.name_user,
        usuario.name_rol,
        usuario.name_permission,
        usuario.email,
        usuario.state_user,
        usuario.date_register,
      ],
    ];

    // Calculamos el espacio de cada columna
    const columnWidth = 35;

    const columnStyles = {};
    for (let i = 0; i < columns.length; i++) {
      columnStyles[i] = { cellWidth: columnWidth };
    }

    doc.autoTable({
      head: [columns],
      body: data,
      theme: "striped",
      startY: 20,
      columnStyles: columnStyles,
      didDrawPage: (data) => {
        // Encabezado
        doc.setFontSize(10);
        doc.text(
          ` Fugaz Retro  - Fecha:${dateGenerateReport}`,
          data.settings.margin.left,
          10
        );
        // Pie de página
        doc.setFontSize(12);
      },
    });

    doc.save("Fugaz report.pdf");
  };
//buscador

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
      <div className='pdf'>
        <TableCell>
          <Button
            className="btn btn-outline-danger"
            onClick={generatePDFReport}>Descargar PDF
          </Button>
        </TableCell>
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
