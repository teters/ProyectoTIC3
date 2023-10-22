const pool = require('../../db');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);



/*function esFormatoJPG(base64String) {
  // Verifica si la cadena base64 comienza con los bytes hexadecimales "FF D8" (cabecera de un archivo JPG)
  return /^data:image\/jpeg;base64,\/9j\//.test(base64String);
}*/

// Validación de correo electrónico único



const registrarUsuarios = async (email, usuario, cedula, fechaNacimiento, password, fotoCedula) => {
  let devolucion = "";

  /*async function convertirImagenABase64(formDataFile) {
    const file = formDataFile;
    
    
    if (!file) {
      throw new Error('No se proporcionó un archivo en el objeto FormData');
    }
  
    try {
      const fileBuffer = formDataFile;
      const base64Data = fileBuffer.toString('base64');
      //const base64Data = file.toString('base64');
      console.log("se convirtio bien", base64Data);
      return base64Data;
    } catch (error) {
      throw new Error('Error al convertir la imagen a base64');
    }
  }*/

  // Verificar que ninguno de los datos sea nulo o indefinido
  if (!email || !usuario || !cedula || !fechaNacimiento || !password) {

    console.error("Todos los campos son obligatorios");
    devolucion = "Todos los campos son obligatorios";
    return devolucion;

  }

  else {
    // Verifica si el correo electrónico ya existe en la base de datos
    //console.log(email, usuario, cedula, fechaNacimiento, password, fotoCedula);
    const emailQuery = 'SELECT COUNT(*) FROM usuarios WHERE mail_usuario = $1';

    const emailResult = await pool.query(emailQuery, [email]);
    //console.log(emailResult);
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

    function imagenABase64(rutaImagen) {
      // Lee la imagen desde el sistema de archivos
      try {
        const imagenData = fs.readFileSync(rutaImagen);

        // Convierte la imagen a base64
        const base64Data = imagenData.toString('base64');

        return base64Data;
      } catch (error) {
        console.error('Error al leer la imagen:', error);
        return null;
      }
    }
    // Ruta de la imagen en la carpeta "uploads"
    //const path = fotoCedula.path;
    const path = require('path');
    console.log("el path es", path);
    // Función para convertir una imagen a base64
    function convertImageToBase64(imagePath) {
      return new Promise((resolve, reject) => {
        // Lee la imagen del sistema de archivos
        fs.readFile(imagePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            // Convierte los datos de la imagen a base64
            const base64Image = data.toString('base64');
            resolve(base64Image);
          }
        });
      });
    }

    // Obtén el path de la imagen desde tu objeto FormData
    const imageInfo = fotoCedula; // Supongo que tienes el objeto FormData en req.file

    // Asegúrate de que imageInfo contenga el path al archivo
    if (!imageInfo || !imageInfo.path) {
      return res.status(400).json({ error: 'Información de la imagen no válida' });
    }

    const imagePath = imageInfo.path;

    const base64Image = await convertImageToBase64(imagePath);
    //console.log(base64Image);


    const insertQuery = 'INSERT INTO usuarios (mail_usuario, nombre_usuario, id_usuario, fecha_nacimiento, contraseña_usuario, foto) VALUES ($1, $2, $3, $4, $5, $6)';
    pool.query(insertQuery, [email, usuario, cedula, fechaNacimiento, password, base64Image]);


    console.log('Usuario registrado exitosamente.');
    devolucion = "Registro existoso";
    const dev = devolucion;

    return dev;




  }
}


module.exports = { registrarUsuarios };