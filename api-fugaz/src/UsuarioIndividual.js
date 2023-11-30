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
  margin-top: 5.8rem;
`;

const StyledCard = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  width: 53%;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  text-align: center;
  align-items: center;
  width: 40%;
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
    <Container>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <StyledCard>
            <div className="cn">
              <CardBody>
                <Table className="table table-bordered">
                  <tbody>
                    <TableRow>
                      <TableHeader>ID</TableHeader>
                      <TableCell>{usuario.iduser}</TableCell>
                      <TableCell colSpan="2">
                        <Button
                          className="btn btn-info"
                          onClick={() => {
                            setMostrarDesglose(!mostrarDesglose);
                          }}>
                          Ver
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/editarusuario/${usuario.iduser}`}
                          className="btn btn-success">
                          Editar
                        </Link>
                      </TableCell>
                      <TableCell className="d-none">
                        <Button
                          className="btn btn-outline-danger"
                          onClick={generatePDFReport}>
                          Descargar PDF
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <Button
                          className="btn btn-danger"
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
  );
}
export default UsuarioIndividual;
  /*const descargarArchivos = () => {
    const pdf = new jsPDF();
    pdf.text(20, 20, "Detalles del Usuario");

    pdf.autoPrint({
      head: [
        [
          "ID",
          "Rol",
          "Estado del Rol",
          "Permiso",
          "Nombre de Usuario",
          "Email",
          "Contraseña",
          "Estado del Usuario",
          "Fecha de Registro",
        ],
      ],
      body: [
        [
          "ID",
          "Rol",
          "Estado del Rol",
          "Permiso",
          "Nombre de Usuario",
          "Email",
          "Contraseña",
          "Estado del Usuario",
          "Fecha de Registro",
        ],
      ],
      theme: "striped",
      styles: { halign: "center" },
      headStyles: { fillColor: [71, 160, 71] },
      didParseCell: (data) => {
        if (data.section === "head") {
          data.cell.styles.fillColor = [71, 160, 71];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      didDrawCell: (data) => {
        console.log(data.column.index);
      },
    });

    pdf.save("usuario.pdf");
  };*/
