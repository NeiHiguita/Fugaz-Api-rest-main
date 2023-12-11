import React, { useState } from 'react';
import axios from 'axios';
import uniquid from 'uniquid';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function AgregarUsuario() {
  //hooks
  const [name_rol, setNamerol] = useState('');
  const [state_rol, setStaterol] = useState(false);
  const [name_permission, setNameper] = useState('');
  const [name_user, setNameuser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state_user, setStateuser] = useState(false);
  const [date_register, setDater] = useState('');
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };
  const validatePassword = (password) => {
    return password.length <= 12;
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Agregar un 0 al mes y al día si son menores que 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  };

  function agregarUsuario() {
    if (
      name_rol.trim() === '' ||
      name_permission.trim() === '' ||
      name_user.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      date_register.trim() === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese todos los campos',
      });
      return;
    }
    const Usuario = {
      name_rol: name_rol.trim(),
      state_rol: state_rol,
      name_permission: name_permission.trim(),
      name_user: name_user.trim(),
      email: email.trim(),
      password: password,
      state_user: state_user,
      date_register: date_register,
      iduser: uniquid(),
    };

    console.log(Usuario);
    axios
      .post('/api/usuario/Agregarusuario', Usuario)
      .then((res) => {
        if (res.data && res.data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.data.message || 'Error desconocido al procesar la solicitud',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario agregado correctamente',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al procesar la solicitud',
        });
      });
  }

  const permisosPorRol = {
    Administrador: ['Ver informes', 'Modificar configuración', 'Acceso total'],
    Cliente: ['Ver perfil', 'Realizar pedidos'],
    Domiciliario: ['Entregar pedidos', 'Ver rutas de entrega', 'registrar usuario'],
  };

  return (
    <div className='container'>
      <div className='row'>
        <h2 className='mt-4'>Crear Un nuevo usuario</h2>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-3'>
          <div className='mb-3'>
            <label htmlFor='name_rol' className='form-label'>
              Nombre del rol
            </label>
            <select
              className='form-select'
              value={name_rol}
              onChange={(e) => setNamerol(e.target.value)}
            >
              <option value=''>Seleccionar Rol</option>
              <option value='Administrador'>Administrador</option>
              <option value='Cliente'>Cliente</option>
              <option value='Domiciliario'>Domiciliario</option>
            </select>
          </div>
          <Form.Group className='mb-3'>
            <Form.Label>Estado del Rol:</Form.Label>
            <Form.Check
              type='switch'
              id='custom-switch'
              checked={state_rol}
              onChange={(e) => setStaterol(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre del permiso</Form.Label>
            <Form.Control
              as='select'
              value={name_permission}
              onChange={(e) => setNameper(e.target.value)}
            >
              <option value=''>Seleccionar Permiso</option>
              {name_rol &&
                permisosPorRol[name_rol].map((permiso, index) => (
                  <option key={index} value={permiso}>
                    {permiso}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <div className='mb-3'>
            <label htmlFor='name_user' className='form-label'>
              Nombre del Usuario
            </label>
            <input
              type='text'
              className='form-control'
              value={name_user}
              onChange={(e) => {
                const inputName = e.target.value;
                if (validateName(inputName) || inputName === "") {
                  setNameuser(inputName);
                }
              }}
            />
            {!validateName(name_user) && name_user !== "" && (
              <small className='text-danger'>Solo se permiten letras.</small>
            )}
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Correo
            </label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={(e) => {
                const inputPassword = e.target.value;
                if (validatePassword(inputPassword) || inputPassword === "") {
                  setPassword(inputPassword);
                }
              }}
            />
            {!validatePassword(password) && password !== "" && (
              <small className='text-danger'>La contraseña debe tener como máximo 12 dígitos.</small>
            )}
          </div>
          <Form.Group className='mb-3'>
            <Form.Label>Estado del Usuario:</Form.Label>
            <Form.Check
              type='switch'
              id='custom-switch'
              checked={state_user}
              onChange={(e) => setStateuser(e.target.checked)}
            />
          </Form.Group>
          <div className='mb-3'>
            <label htmlFor='date_register' className='form-label'>
              Fecha de registro
            </label>
            <input
              type='date'
              className='form-control'
              value={date_register}
              max={getCurrentDate()} // Establecer la fecha máxima permitida
              onChange={(e) => {
                const selectedDate = e.target.value;
                if (selectedDate === getCurrentDate()) {
                  setDater(selectedDate);
                } else {
                  // Mostrar algún tipo de mensaje de error, SweetAlert2 por ejemplo
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Solo se permite la fecha actual.',
                  });
                }
              }}
            />
          </div>
          <button onClick={agregarUsuario} className='btn btn-success'>
            Guardar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;

