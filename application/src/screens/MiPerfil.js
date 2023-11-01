import React from 'react';
import styles from "./MiPerfil.module.css";

//let nombre = "felipe";
//let mail = "felipeMail";
let fechaNacimiento ="fechaNac";
//let dineroDisponible = 500;

let nombre = localStorage.getItem("nombreUs");
let dineroDisponible =  localStorage.getItem("saldoUs");
let mail =  localStorage.getItem("emailUs");

const MiPerfil = () => {

  const handleCerrarSesion = async () => {
    //localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div name = "MiPerfil" className= {styles.home}>
    <p className='h2'><u>Mi Perfil</u></p>
    
    <table class="table table-striped table-bordered">
      
      <tbody>
        <tr>
          <td > <strong> Nombre </strong> </td>
          <td > <strong> Mail </strong> </td>
          <td > <strong> Fecha de nacimiento </strong> </td>
          <td > <strong> Dinero disponible </strong> </td>
        </tr>
        <tr>
          <td>{nombre}</td>
          <td>{mail}</td>
          <td>{fechaNacimiento}</td>
          <td>{dineroDisponible}</td>
        </tr>
      </tbody>  
    </table>

    <div>
    <p className='h6'><u>Historial de apuestas</u></p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Dinero apostado</th>
            <th scope="col">Multiplicador de retiro</th>
            <th scope="col">Dinero retirado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
        </tbody>
  </table>
    </div>
      <div className={styles.margins} >
      <button type="button" class="btn btn-outline-warning">Cargar dinero con Mercado Pago</button>
      &nbsp; &nbsp; &nbsp; 
      <button type="button" class="btn btn-outline-danger" onClick={handleCerrarSesion}>Cerrar sesión</button>
      </div>
    </div>

  )
}

export default MiPerfil