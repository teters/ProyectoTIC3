const pool = require('../../db');
const bodyParser = require('body-parser');
const express = require('express');



/* function esFormatoJPG(base64String) {
  // Verifica si la cadena base64 comienza con los bytes hexadecimales "FF D8" (cabecera de un archivo JPG)
  return /^data:image\/jpeg;base64,\/9j\//.test(base64String);
}
*/

// Validación de correo electrónico único



const registrarUsuarios = async (email, usuario, cedula, fechaNacimiento, password) => {
  let devolucion = "";
  // Verificar que ninguno de los datos sea nulo o indefinido
  if (!email || !usuario || !cedula || !fechaNacimiento || !password) {
    
    console.error("Todos los campos son obligatorios");
    devolucion = "Todos los campos son obligatorios";
    return devolucion;
    
  }

  else{
    // Verifica si el correo electrónico ya existe en la base de datos

    const emailQuery = 'SELECT COUNT(*) FROM usuarios WHERE mail_usuario = $1';

    const emailResult = await pool.query(emailQuery, [email]);
    console.log(emailResult);
    const emailExists = emailResult.rows[0].count > 0;

    if (emailExists) {
      console.log("El correo electrónico ya está registrado.");
      devolucion = "El correo electrónico ya está registrado.";
      return devolucion;

    }

    // Validar que la cédula sea un número de 8 caracteres y que no este registrada
    const ciQUery = 'SELECT COUNT(*) FROM usuarios WHERE id_usuario = $1'
    const ciResult = await pool.query(ciQUery, [cedula]);
    const ciExists = ciResult.rows[0].count > 0;
    
    if (ciExists) {
      console.log("Esa cédula ya fue registrada");
      devolucion = "Esa cédula ya fue registrada";
      return devolucion;
    }

    if (!/^\d{8}$/.test(cedula)) {
      console.log("La cédula debe contener exactamente 8 dígitos.");
      devolucion = "La cédula debe contener exactamente 8 dígitos.";
      return devolucion;
    }

    // Verificación de edad (más de 18 años)
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    console.log(edad);

    if (edad < 18) {
      console.log('Debes tener al menos 18 años para registrarte.');
      devolucion = "Debes tener al menos 18 años para registrarte.";
      return devolucion;
    }

    /*const fotoCedula64 = Buffer.from(fotoCedula, 'base64');
    if(!esFormatoJPG(fotoCedula64)){
      console.log("La foto debe ser ingresada en formato JPG");
    } */

    // Insertar el nuevo usuario en la base de datos

    const insertQuery = 'INSERT INTO usuarios (mail_usuario, nombre_usuario, id_usuario, fecha_nacimiento, contraseña_usuario) VALUES ($1, $2, $3, $4, $5)';
    pool.query(insertQuery, [email, usuario, cedula, fechaNacimiento, password]);

    
    console.log('Usuario registrado exitosamente.');
    devolucion = "Registro existoso";
    const dev = devolucion;
    return dev;
  }


}




module.exports = { registrarUsuarios };