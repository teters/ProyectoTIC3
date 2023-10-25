const pool = require('../../db');

const modificarSaldo = async (email, saldo) => {
    //console.log("entro al busuqeda de datos y el saldo es:", saldo);
   // const resultado = await new Promise((resolve, reject) => {
   // Hago un request para llegar verificar el mail y ahi cambio los datos
    //return resultado;
    try {
        const query = 'UPDATE usuarios SET dinero_disponible = $1 WHERE mail_usuario = $2 RETURNING *';
        const result = await pool.query(query, [saldo, email]);

        // result.rows contiene los datos actualizados del usuario, puedes acceder a ellos según tu estructura de datos
        console.log('Saldo actualizado:', result.rows[0].dinero_disponible);
    
        return result.rows[0].dinero_disponible;
      } catch (error) {
        console.error('Error al modificar el saldo:', error);
        throw error;
      }
};

module.exports={modificarSaldo};