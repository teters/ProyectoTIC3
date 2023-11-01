import React from 'react';
import styles from "./MiPerfil.module.css";

let nombre = "felipe";
let mail = "felipeMail";
let fechaNacimiento ="fechaNac";
let dineroDisponible = 500;

const MiPerfil = () => {
  return (
    <div name = "MiPerfil" className= {styles.home}>
    <p className='h2'><u>Mi Perfil</u></p>
    
    <table class="table">
      <thread>
        <tr>
          <th>Nombre</th>
          <th>Mail</th>
          <th>Fecha de nacimiento</th>
          <th>Dinero disponible</th>
        </tr>
      </thread>
      <tbody>
        <tr>
          <td>{nombre}</td>
          <td>{mail}</td>
          <td>{fechaNacimiento}</td>
          <td>{dineroDisponible}</td>
        </tr>
      </tbody>  
    </table>
     
    </div>

  )
}

export default MiPerfil