import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';


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
`;

function CompraIndividual({ compra }) {
    const navigate = useNavigate();
  
    // Función para eliminar compra
    function borrarCompra(idbuy) {
      axios
        .post('/api/compra/borrarcompra', { idbuy: idbuy })
        .then((res) => {
          console.log(res.data[0]);
          toast.success(res.data);
          navigate(0);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
      function descargarArchivos() {
    const pdf = new jsPDF();
    pdf.text(20, 20, 'Detalles de la compra');

    // Loop sobre las filas de la tabla y añadir al PDF
    document.querySelectorAll('#pdf-container tbody tr').forEach((row, index) => {
      const columns = row.querySelectorAll('td');
      const rowData = [];
      columns.forEach((column) => {
        rowData.push(column.innerText);
      });
      pdf.text(5, 15 + index * 5, rowData.join(', '));
    });

    pdf.save('compra.pdf');
  }
  function descargarXls(){
    const ws = XLSX.utils.table_to_sheet(document.querySelector('#pdf-container table'));
    const wb = XLSX.utils.book_new(
      XLSX.utils.aoa_to_sheet([
        ['Detalles de la Compra'],
        ['ID Compra', compra.idbuy],
        ['Fecha de Compra', compra.buy_date],
        ['Total de la Compra', compra.price_total],
        ['Método de Pago', compra.payment_methods],
        ['Cantidad', compra.quantity],
        ['Subtotal', compra.subtotal],
        ['Categoría', compra.name_category],
        ['Nombre del Insumo', compra.name_input],
        ['Stock', compra.stock],
        ['Precio Unitario', compra.unit_price],
        ['Estado del Insumo', compra.status_input],
        ['Tipo', compra.type],
        ['Nombre Completo', compra.full_name],
        ['Documento', compra.document],
        ['RUT', compra.rut],
        ['Nombre del Representante Legal', compra.legal_representative_name],
        ['Teléfono', compra.phone],
        ['Dirección', compra.address],
        ['Estado del Insumo en Proceso', compra.statuspro],
      ])
    );
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'compra.xlsx');
  }
    return (
        <Container className='cn'>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <StyledCard>
              <div className='cn'>
                <CardHeader>
                  <h2>Detalles de la Compra</h2>
                </CardHeader>
                <CardBody id='pdf-container'>
                  <Table className="table table-bordered">
                    <tbody>
                      <TableRow>
                        <TableHeader>ID Compra</TableHeader>
                        <TableCell>{compra.idbuy}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Fecha de Compra</TableHeader>
                        <TableCell>{compra.buy_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Categoría</TableHeader>
                        <TableCell>{compra.name_category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Nombre del Insumo</TableHeader>
                        <TableCell>{compra.name_input}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Cantidad</TableHeader>
                        <TableCell>{compra.quantity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Stock</TableHeader>
                        <TableCell>{compra.stock}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Precio Unitario</TableHeader>
                        <TableCell>{compra.unit_price}</TableCell>
                      </TableRow>
                       <TableRow>
                        <TableHeader>Estado del Insumo</TableHeader>
                        <TableCell>{compra.status_input}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Tipo</TableHeader>
                        <TableCell>{compra.type}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Nombre Completo</TableHeader>
                        <TableCell>{compra.full_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Documento</TableHeader>
                        <TableCell>{compra.document}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>RUT</TableHeader>
                        <TableCell>{compra.rut}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Nombre del Representante Legal</TableHeader>
                        <TableCell>{compra.legal_representative_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Teléfono</TableHeader>
                        <TableCell>{compra.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Dirección</TableHeader>
                        <TableCell>{compra.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Estado del Proveedor</TableHeader>
                        <TableCell>{compra.statuspro}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Método de Pago</TableHeader>
                        <TableCell>{compra.payment_methods}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Subtotal</TableHeader>
                        <TableCell>{compra.subtotal}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Total de la Compra</TableHeader>
                        <TableCell>{compra.price_total}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeader>Acciones</TableHeader>
                        <TableCell>
                          <Link to={`/editarcompra/${compra.idbuy}`} className="btn btn-success">
                            Editar
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button className="btn btn-outline-danger" onClick={descargarArchivos}>Descargar PDF</Button>
                        </TableCell>
                        <TableCell>
                          <Button className="btn btn-outline-success" onClick={descargarXls}>Descargar Excel</Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            className="btn btn-danger"
                            onClick={() => {
                              borrarCompra(compra.idbuy);
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
                  <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </CardFooter>
              </div>
              </StyledCard>
            </div>
          </div>
        </Container>
      );
    }
export default CompraIndividual