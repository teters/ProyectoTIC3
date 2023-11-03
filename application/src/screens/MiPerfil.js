import React from 'react';
import styles from "./MiPerfil.module.css";

//let nombre = "felipe";
//let mail = "felipeMail";
//let fechaNacimiento ="fechaNac";
//let dineroDisponible = 500;

let nombre = localStorage.getItem("nombreUs");
let dineroDisponible =  localStorage.getItem("saldoUs");
let mail =  localStorage.getItem("emailUs");
let fechaNacimiento = localStorage.getItem("fechaNac");


const MiPerfil = () => {

  const cerrarSesion = () => {
    window.location.href = "/";

  };

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

      <div className={styles.margins} >
      <button type="button" class="btn btn-outline-warning">Cargar dinero con Mercado Pago</button>
      &nbsp; &nbsp; &nbsp; 
      <button type="button" class="btn btn-outline-danger" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>

  )
}

export default MiPerfil;