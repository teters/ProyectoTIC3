const pool = require('../../db');

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
    gananciaTemp = parseInt(ganancia, 10);
    let saldoActual = parseInt(saldoActualResult.rows[0].dinero_disponible, 10);
    
     //console.log("saldo actuael", saldoActual);
     //console.log("la ganancia es", ganancia);
     let saldoNuevo = ganancia + saldoActual;
     //console.log("el nuevo saldo es", saldoNuevo);

     // Luego, actualiza el saldo en la base de datos
     const actualizarSaldoQuery = 'UPDATE usuarios SET dinero_disponible = $1 WHERE mail_usuario = $2';
     await pool.query(actualizarSaldoQuery, [saldoNuevo, email]);
 
     return { email, saldoNuevo };
   } catch (error) {
     console.error('Error al modificar el saldo:', error);
     throw error;
   }

};

module.exports={modificarSaldo};