import jsPDF from 'jspdf';
import 'jspdf-autotable';

//generar el reporte para los usuarios
const generarReportePDF = (Usuario) => {
  const doc = new jsPDF({
    orientation: 'landscape',
  });
  // Definimos las columnas de la tabla del documento
  const columns = [
    'ID',
    'Nombre de Usuario',
    'Rol',
    'Permiso',
    'Email',
    'Estado',
    'Fecha de Registro',
  ];
  // Definimos los valores de las columnas del documento
  const data = [
    [
      Usuario.iduser,
      Usuario.name_user,
      Usuario.name_rol,
      Usuario.name_permission,
      Usuario.email,
      Usuario.state_user,
      Usuario.date_register,
    ],
  ];
  // Agregar el título del documento
  doc.text('Reporte de Usuarios', 10, 10);
  // Agregar la fecha de generación del documento
  doc.text(`Reporte generado el ${new Date().toDateString()}`, 10, 20);
  // Agregar la tabla al documento
  doc.autoTable(columns, data, { startY: 25 });
  
  // Guardar el documento como PDF
  doc.save('reporte_usuario.pdf');
};

export default generarReportePDF;
