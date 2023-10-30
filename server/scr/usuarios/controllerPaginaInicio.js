const pool = require('../../db');
const { v4: uuidv4 } = require('uuid');

let saldoActual = 0;


const modificarSaldo = async (email, ganancia) => {
  //console.log("entro al busuqeda de datos y el saldo es:", saldo);
  // const resultado = await new Promise((resolve, reject) => {
  // Hago un request para llegar verificar el mail y ahi cambio los datos
  //return resultado;

  try {
    // Primero, consulta el saldo actual en la base de datos
    const consultaSaldoQuery = 'SELECT dinero_disponible FROM usuarios WHERE mail_usuario = $1';
    const saldoActualResult = await pool.query(consultaSaldoQuery, [email]);

    if (saldoActualResult.rows.length === 0) {
      return { error: 'Correo electrónico no encontrado' };
    }
    let gananciaDec = parseInt(ganancia, 10);

    saldoActual = parseInt(saldoActualResult.rows[0].dinero_disponible, 10);

    console.log("saldo actuael", saldoActual);
    //console.log("la ganancia es", ganancia);
    let saldoNuevo = gananciaDec + saldoActual;
    //console.log("el nuevo saldo es", saldoNuevo);

    // Luego, actualiza el saldo en la base de datos
    const actualizarSaldoQuery = 'UPDATE usuarios SET dinero_disponible = $1 WHERE mail_usuario = $2';
    await pool.query(actualizarSaldoQuery, [saldoNuevo, email]);
   // console.log("el saldo nuevo final es", saldoNuevo);

    return { email, saldoNuevo };
  } catch (error) {
    console.error('Error al modificar el saldo:', error);
    throw error;
  }

};
const buscarMultiplicadores = async() =>{
  try {
    // Consulta los últimos 10 valores de la columna multiplicador
    const consultaMultiplicadoresQuery = 'SELECT multiplicador, fecha  FROM jugada ORDER BY fecha desc , hora desc fetch first 10 rows only';

  
    // Ejecuta la consulta
    const multiplicadoresResult = await pool.query(consultaMultiplicadoresQuery);
  
    // Obtén los valores de multiplicador de los resultados
    const multiplicadores = await multiplicadoresResult.rows.map(row => row.multiplicador);
    
    
    console.log('Últimos 10 valores de multiplicador:', multiplicadores);

    return multiplicadores;

  } catch (error) {
    console.error('Error al obtener los últimos valores de multiplicador:', error);
  }

};

const arrancaPartida = async (email) => {

  console.log("entro en arranca partida");
  const ahora = new Date();
  let id = uuidv4();
  const opcionesHora = { timeZone: 'America/Montevideo', hour12: false };
  const hora = ahora.toLocaleTimeString('es-UY', opcionesHora);
  let dia = ahora.toISOString().slice(0, 10); // en formato YYYY-MM-DD
  let multiplier = generarNumeroAleatorio();

  //console.log(id);
  //console.log(dia); //FIXME tengo que cambiar el tipo de esto
  //console.log(hora);
  //console.log(multiplier);

  try {
    // Consulta de inserción
    const insertQuery = 'INSERT INTO jugada (id, fecha, hora, multiplicador) VALUES ($1, $2, $3, $4) RETURNING *';
    // Ejecutar la consulta de inserción
    const result = await pool.query(insertQuery, [id, dia, hora, multiplier]);

    console.log('Partida insertada:', result.rows[0]);

    // Aquí puedes devolver el multiplicador

  } catch (error) {
    console.error('Error al insertar la partida:', error);
    throw error;
  }

  const consultaSaldoQuery = 'SELECT dinero_disponible FROM usuarios WHERE mail_usuario = $1';
  const saldoRequest = await pool.query(consultaSaldoQuery, [email]);
  saldoActual = saldoRequest.rows[0].dinero_disponible
  

  return { email, id, multiplier, saldoActual }
  // guardar en base de datos
  // si se guardo bien, te devuelvo un json con el mulplier
  // Traer dinero disponible de ese email  y el id

  function generarNumeroAleatorio() {
    const prob = Math.random();  // Genera un número aleatorio entre 0 y 1

    if (prob <= 0.12) {
      return 1.0;
    } else if (prob <= 0.52) {
      return parseFloat((1.1 + Math.random() * 0.8).toFixed(1));
    } else if (prob <= 0.75) {
      return parseFloat((2.0 + Math.random() * 0.5).toFixed(1));
    } else if (prob <= 0.85) {
      return parseFloat((2.5 + Math.random() * 1.4).toFixed(1));
    } else if (prob <= 0.91) {
      return parseFloat((4.0 + Math.random() * 6.0).toFixed(1));
    } else if (prob <= 0.96) {
      return parseFloat((10.0 + Math.random() * 10.0).toFixed(1));
    } else {
      return parseFloat((20.0 + Math.random() * 80.0).toFixed(1));
    }
  }
};

const cargarJugadaUsuario = async (email, idJugada, apostado, mutliplicador, dineroGanado) => {
 
  try {
    const insertUsuarioJugadaQuery = 'INSERT INTO usuario_jugada (email_usuario, id_jugada, dinero_apostado, multiplicador_retiro, dinero_retirado) VALUES ($1, $2, $3, $4, $5)';
    const insertResult = await pool.query(insertUsuarioJugadaQuery, [email, idJugada, apostado, mutliplicador, dineroGanado]);
    mensaje = "Se cargo bien."
    return mensaje;

  } 
    catch (error) {
    console.error('Error al guardar usuario partida:', error);
    throw error;
  }

};

// const

module.exports = { modificarSaldo, arrancaPartida, cargarJugadaUsuario, buscarMultiplicadores };