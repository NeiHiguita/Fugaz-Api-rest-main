import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generarReportePDF = async () => {
  try {
    // Realizar solicitud HTTP para obtener la lista de usuarios desde tu API
    const response = await fetch('/api/usuario/obtenerusuarios');
    const usuarios = await response.json();

    // Validar si hay datos para generar el informe
    if (!usuarios || usuarios.length === 0) {
      console.log("No hay datos para generar el informe.");
      return;
    }

    const dateGenerateReport = new Date().toDateString();
    const doc = new jsPDF({ orientation: "landscape" });

    const columns = [
      "ID",
      "Nombre de Usuario",
      "Rol",
      "Permiso",
      "Email",
      "Estado",
      "Fecha de Registro",
    ];

    const data = usuarios.map(usuario => [
      usuario.iduser,
      usuario.name_user,
      usuario.name_rol,
      usuario.name_permission,
      usuario.email,
      usuario.state_user,
      usuario.date_register,
    ]);

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
        doc.setFontSize(10);
        const pageWidth = doc.internal.pageSize.width;
        const headerText = ` Fugaz Retro  - Fecha:${dateGenerateReport}`;
        const headerTextWidth =
          (doc.getStringUnitWidth(headerText) *
            doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        const headerXPosition = pageWidth - headerTextWidth - 10;

        doc.text(headerText, headerXPosition, 10);

        doc.setFontSize(12);
        doc.text(
          `Página ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );

        doc.setFontSize(10);
        doc.text(
          "Correo: fugazretro@gmail.com",
          data.settings.margin.left,
          doc.internal.pageSize.height - 20
        );
      },
    });

    doc.save("Fugaz report.pdf");
  } catch (error) {
    console.error("Error al obtener usuarios desde la API:", error);
  }
};

export default generarReportePDF;
