import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function OtraPagina() {
  return <div>Otra Página</div>; // Reemplaza esto con el contenido real de tu otra página
}

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación de correo y contraseña (ajusta según tus necesidades)
    const correoValido = correo === 'neiderhiguita13@gmail.com';
    const passwordValido = password === '1015068806';

    if (correoValido && passwordValido) {
      // Iniciar sesión exitosa
      setLoggedIn(true);
    } else {
      // Iniciar sesión fallida
      alert('Correo o contraseña incorrectos');
    }
  };

  // Redirección después de iniciar sesión
  if (loggedIn) {
    return <Navigate to="./App" />; // Cambia esto con la ruta correcta
  }

  return (
    <center>
      <div>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </center>
  );
}

export default Login;
