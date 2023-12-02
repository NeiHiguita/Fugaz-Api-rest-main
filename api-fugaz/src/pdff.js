
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generarReportePDF = (Compra) => {
  const doc = new jsPDF({
    orientation: 'landscape',
  });

  

  // Definir las columnas comunes para ambos tipos de proveedor
  const columnsCommon = [
    'Fecha de Compra', 'Categoría Insumo', 'Insumo', 'Cantidad', 'Stock',
    'Estado Insumo', 'Tipo Proveedor', 'Teléfono', 'Dirección', 'Estado Proveedor',
    'Método Pago', 'Subtotal', 'Precio Total'
  ];

  // Filtrar las compras por tipo de proveedor
  const comprasNaturales = Compra.filter(compra => compra.type === 'natural');
  const comprasEmpresa = Compra.filter(compra => compra.type === 'empresa');

  // Función para generar la tabla según el tipo de proveedor
  const generarTabla = (data, startY, columns) => {
    const rows = data.map(compra => {
      const formattedDate = compra.buy_date ? new Date(compra.buy_date).toLocaleDateString() : '';

      // Armar la fila de la tabla según el tipo de proveedor
      const row = [
        formattedDate, compra.name_category, compra.name_input, compra.quantity, compra.stock,
        compra.status_input, compra.type
      ];

      if (compra.type === 'natural') {
        if (compra.full_name && compra.document) {
          row.push(compra.full_name, compra.document);
        }
      } else if (compra.type === 'empresa') {
        if (compra.rut && compra.legal_representative_name) {
          row.push(compra.rut, compra.legal_representative_name);
        }
      }

      row.push(
        compra.phone || '', compra.address || '', compra.statuspro,
        compra.payment_methods, compra.subtotal, compra.total_price || compra.subtotal // Utilizar el subtotal si no hay precio total disponible
      );

      return row;
    }).filter(row => row.some(value => value !== '')); // Filtrar las filas con valores

    if (rows.length > 0) {
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: startY,
      });
    }
  };

  // Generar la tabla para proveedores naturales
  generarTabla(comprasNaturales, 20, [...columnsCommon.slice(0, 7), 'Nombre', 'Documento', ...columnsCommon.slice(7)]);

  // Agregar una página y generar la tabla para proveedores de empresa
  doc.addPage();
  generarTabla(comprasEmpresa, 20, [...columnsCommon.slice(0, 7), 'RUT', 'Representante Legal', ...columnsCommon.slice(7)]);

   // Obtener la fecha actual
 /* const fechaActual = new Date().toLocaleDateString();
  //doc.text(`Fecha de generación del reporte: ${fechaActual}`, 10, doc.internal.pageSize.height - 10);
  //doc.setFontSize(10);
  doc.text(`Correo: fugazretro@correo.com`, 10, doc.internal.pageSize.height - 20);
  doc.text(`Fecha de generación del reporte: ${fechaActual}`, 10, doc.internal.pageSize.height - 10);
*/
  // Guardar el documento como PDF
  doc.save('reporte_compras.pdf');
};

export default generarReportePDF;
