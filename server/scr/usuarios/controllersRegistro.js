const pool = require('../../db');

// Validación de correo electrónico único
registrarUsuarios = async (req, res) => {
  // Verifica si el correo electrónico ya existe en la base de datos
  const emailQuery = 'SELECT COUNT(*) FROM usuarios WHERE email = $1';
  const emailResult = await pool.query(emailQuery, [email]);
  const emailExists = emailResult.rows[0].count > 0;

  if (emailExists) {
    return res.status(500).json({ error: 'El correo electrónico ya está registrado.' });
  }

  // Verificación de edad (más de 18 años)
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();

  if (edad < 18) {
    return res.status(500).json({ error: 'Debes tener al menos 18 años para registrarte.' });
  }

  // Validar que la cédula sea un número de 8 caracteres
  if (!/^\d{8}$/.test(cedula)) {
    return res.status(500).json({ error: 'La cédula debe contener exactamente 8 dígitos.' });
  }

  // Insertar el nuevo usuario en la base de datos
  const insertQuery = 'INSERT INTO usuarios (email, nombre, usuario, cedula, fecha_nacimiento, password) VALUES ($1, $2, $3, $4, $5, $6)';
  await pool.query(insertQuery, [email, nombre, usuario, cedula, fechaNacimiento, password]);

  res.status(201).json({ message: 'Usuario registrado exitosamente.' });
}