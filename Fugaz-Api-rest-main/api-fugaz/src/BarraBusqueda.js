import React, { useState } from 'react';
import './style.css';

function BarraBusqueda({ onBuscar }) {
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(busqueda);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-busqueda"
        type="text"
        value={busqueda}
        onChange={handleChange}
        placeholder="Buscar..."
      />
      <button className="btn btn-outline-info" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default BarraBusqueda;
