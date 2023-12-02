import React, { useState } from 'react';
import './style.css';

function BarraBusqueda({ onBuscar }) {
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e) => {
    const nuevaBusqueda = e.target.value;
    setBusqueda(nuevaBusqueda);
    onBuscar(nuevaBusqueda); // Llamar a la función onBuscar con la nueva búsqueda
  };

  return (
    <form className="form-container">
      <input
        className="input-busqueda"
        type="text"
        value={busqueda}
        onChange={handleChange}
        placeholder="Buscar..."
      />

    </form>
  );
}

export default BarraBusqueda;
