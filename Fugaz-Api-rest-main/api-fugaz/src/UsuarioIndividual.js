import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Reports JPDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';

import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

//Hooks


const Container = styled.div`
  margin-top: 5rem;
`;

const StyledCard = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 1px;
  text-align: center;
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
`;

const TableCell = styled.td`
  padding: 0.5rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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

  function borrarUsuario(iduser) {
    axios
      .post('/api/usuario/borrarusuario', { iduser })
      .then((res) => {
        console.log(res.data[0]);
        toast.success(res.data);
        navigate(0);
      })
      .catch((err) => {
        toast.error(err);
      });
  }


  const user = useState('');
  const descargarArchivos = () => {
    const pdf = new jsPDF();
    pdf.text(20, 20, 'Detalles del Usuario');

    pdf.autoPrint({
      head:[['ID', 'Rol', 'Estado del Rol', 'Permiso', 'Nombre de Usuario', 'Email', 'Contraseña', 'Estado del Usuario', 'Fecha de Registro']],
      body:[[]],
      theme: 'striped',
      styles: { halign: 'center' },
      headStyles: { fillColor: [71, 160, 71] },
      didParseCell: (data) => {
        if (data.section === 'head') {
          data.cell.styles.fillColor = [71, 160, 71];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      didDrawCell: (data) => {
        console.log(data.column.index)
      }
    })

    pdf.save('usuario.pdf');
  }

  return (
    <Container>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <StyledCard>
              <div className='cn'>
                <CardHeader>
                  <h2>Detalles del Usuario</h2>
                </CardHeader>
                <CardBody>
                  <Table className="table table-bordered">
                    <tbody>
                      <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableCell>{usuario.iduser}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Rol</TableHeader>
                        <TableCell>{usuario.name_rol}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Estado del Rol</TableHeader>
                        <TableCell>{usuario.state_rol}</TableCell>
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
                        <TableCell>{usuario.passaword}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Estado del Usuario</TableHeader>
                        <TableCell>{usuario.state_user}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Fecha de Registro</TableHeader>
                        <TableCell>{usuario.date_register}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Acciones</TableHeader>
                        <TableCell>
                          <Link to={`/editarusuario/${usuario.iduser}`} className="btn btn-success">
                            Editar
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button className="btn btn-outline-danger" onClick={descargarArchivos}>Descargar PDF</Button>
                        </TableCell>
                        <TableCell>
                          {/*<Button className="btn btn-outline-success" onClick={descargarXls}>Descargar Excel</Button>*/}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="btn btn-danger d-none"
                            onClick={() => {
                              borrarUsuario(usuario.iduser);
                            }}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </CardFooter>
                </div>
              </StyledCard>
            </div>
          </div>
        </Container>
  );
}

export default UsuarioIndividual;
