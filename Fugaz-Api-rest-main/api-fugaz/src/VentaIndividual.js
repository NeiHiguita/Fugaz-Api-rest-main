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
  padding: 1rem;
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

function VentaIndividual({ venta }) {
  const navigate = useNavigate();

  // Función para eliminar venta
  function borrarVenta(idsale) {
    axios
      .post('/api/venta/borrarventa', { idsale: idsale })
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
    pdf.text(20, 20, 'Detalles de la venta');

    // Loop sobre las filas de la tabla y añadir al PDF
    document.querySelectorAll('#pdf-container tbody tr').forEach((row, index) => {
      const columns = row.querySelectorAll('td');
      const rowData = [];
      columns.forEach((column) => {
        rowData.push(column.innerText);
      });
      pdf.text(5, 15 + index * 5, rowData.join(', '));
    });

    pdf.save('venta.pdf');
  }
  function descargarXls(){
    const ws = XLSX.utils.table_to_sheet(document.querySelector('#pdf-container table'));
    const wb = XLSX.utils.book_new(
      XLSX.utils.aoa_to_sheet([
        ['Detalles de la venta'],
        ['ID Venta', 'Costo de Envío', 'Total de la Venta', 'Documento', 'Dirección', 'Ciudad', 'Teléfono', 'Estado de la Orden', 'Método de Pago', 'Fecha de la Orden', 'Fecha de Entrega', 'Costo de la Orden', 'Cantidad', 'Precio Unitario', 'Subtotal', 'Nombre', 'Tamaño', 'Color', 'Foto', 'Precio de Venta'],      ])
    );
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.writeFile(wb, 'ventas.xlsx');
  }
  return (
    <Container className='cn'>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <StyledCard>
          <div className='cn'>
            <CardHeader>
              <h2>Detalles de la Venta</h2>
            </CardHeader>
            <CardBody id='pdf-container'>
              <Table className="table table-bordered">
                <tbody>
                  <TableRow>
                    <TableHeader>ID Venta</TableHeader>
                    <TableCell>{venta.idsale}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Costo de Envío</TableHeader>
                    <TableCell>{venta.shipping_cost}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Total de la Venta</TableHeader>
                    <TableCell>{venta.total_sale}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Documento</TableHeader>
                    <TableCell>{venta.document}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Dirección</TableHeader>
                    <TableCell>{venta.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Ciudad</TableHeader>
                    <TableCell>{venta.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Teléfono</TableHeader>
                    <TableCell>{venta.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Estado de la Orden</TableHeader>
                    <TableCell>{venta.order_status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Método de Pago</TableHeader>
                    <TableCell>{venta.Method_payment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Fecha de la Orden</TableHeader>
                    <TableCell>{venta.data_order}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Fecha de Entrega</TableHeader>
                    <TableCell>{venta.deliver_data}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Costo de la Orden</TableHeader>
                    <TableCell>{venta.order_cost}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Cantidad</TableHeader>
                    <TableCell>{venta.amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Precio Unitario</TableHeader>
                    <TableCell>{venta.unit_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Subtotal</TableHeader>
                    <TableCell>{venta.subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Nombre</TableHeader>
                    <TableCell>{venta.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Tamaño</TableHeader>
                    <TableCell>{venta.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Color</TableHeader>
                    <TableCell>{venta.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Foto</TableHeader>
                    <TableCell>{venta.photo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Precio de Venta</TableHeader>
                    <TableCell>{venta.sale_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Acciones</TableHeader>
                    <TableCell>
                      <Link to={`/editarventa/${venta.idsale}`} className="btn btn-success">
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
                          borrarVenta(venta.idsale);
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
export default VentaIndividual