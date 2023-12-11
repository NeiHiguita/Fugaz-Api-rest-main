import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
// Reports JPDF
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useState } from "react";

import styled from "styled-components";
import "./style.css";

//Hooks

const Container = styled.div`
`;

const StyledCard = styled.div`
`;

const CardBody = styled.div`
`;

const Table = styled.table`
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.th`
`;

const TableCell = styled.td`
`;

const Button = styled.button`
`;

function UsuarioIndividual({ usuario }) {
  const navigate = useNavigate();
  const [mostrarDesglose, setMostrarDesglose] = useState(false);
  const getstateror = (state_rol) => {
    if (state_rol === true) {
      return "Activo";
    } else {
      return "Inactivo";
    }
  };
  const getstateuser = (state_user) => {
    if (state_user === true) {
      return "Activo";
    } else {
      return "Inactivo";
    }
  };
  const passawordoculto = (password) => {
    if (password) {
      return "********";
    } else {
      return "********";
    }
  };


  function borrarUsuario(iduser) {
    axios
      .post("/api/usuario/borrarusuario", { iduser })
      .then((res) => {
        console.log(res.data[0]);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: res.data || 'Usuario eliminado correctamente',
        });
        navigate(0);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err || 'Error al procesar la solicitud',
        });
      });
  }
  //const user = useState("");

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
        doc.text(
          `Página ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
        //correo de la empresa
        doc.setFontSize(10);
        doc.text(
          "Correo: fugazretro@gmail.com",
          data.settings.margin.left,
          doc.internal.pageSize.height - 20
        );
      },
    });
    doc.save("Fugaz report.pdf");
  };

  return (
    <center>
    <Container>
      <div className="">
        <div className="">
          <StyledCard>
            <div className="cn">
              <CardBody>
                <Table className="">
                  <tbody>
                    <TableRow>
                      <TableHeader>ID</TableHeader>
                      <TableCell>{usuario.iduser}</TableCell>
                      <TableCell colSpan="2">
                        <Button
                          className=""
                          onClick={() => {
                            setMostrarDesglose(!mostrarDesglose);
                          }}>
                          Ver
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/editarusuario/${usuario.iduser}`}
                          className="">
                          Editar
                        </Link>
                      </TableCell>
                      <TableCell className="d-none">
                        <Button
                          className=""
                          onClick={generatePDFReport}>
                          Descargar PDF
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <Button
                          className=""
                          onClick={() => {
                            borrarUsuario(usuario.iduser);
                          }}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                    {mostrarDesglose && (
                      <>
                        <TableRow>
                          <TableHeader>Rol</TableHeader>
                          <TableCell>{usuario.name_rol}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Estado del Rol</TableHeader>
                          <TableCell>{getstateror(usuario.state_rol)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Permiso</TableHeader>
                          <TableCell>{usuario.name_permission}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Nombre de Usuario</TableHeader>
                          <TableCell>{usuario.name_user}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Email</TableHeader>
                          <TableCell>{usuario.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Contraseña</TableHeader>
                          <TableCell>{passawordoculto(usuario.passaword)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Estado del Usuario</TableHeader>
                          <TableCell>{getstateuser(usuario.state_user)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeader>Fecha de Registro</TableHeader>
                          <TableCell>{usuario.date_register}</TableCell>
                        </TableRow>
                      </>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </div>
          </StyledCard>
        </div>
      </div>
    </Container>
    </center>
  );
}
export default UsuarioIndividual;