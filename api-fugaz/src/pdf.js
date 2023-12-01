import jsPDF from 'jspdf';
import 'jspdf-autotable';

//generar el reporte para los usuarios
const generarReportePDF = (usuario) => {
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
  const pageWidth = doc.internal.pageSize.width;
  const headerText = ` Fugaz Retro  - Fecha:${dateGenerateReport}`;
  const headerTextWidth = doc.getStringUnitWidth(headerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const headerXPosition = pageWidth - headerTextWidth - 10; // Ajusta el valor 10 según sea necesario

  doc.

text(headerText, headerXPosition, 10);
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

export default generarReportePDF;
