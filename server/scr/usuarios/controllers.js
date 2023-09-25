const pool = require('../../db');

const getUsers = (req, res) => {
    pool.query("SELECT * FROM prueba.usuarios", (error, results)=>{
        if(error){
            // Manejar el error y enviar una respuesta de error
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error en la consulta" });
        }
        res.status(200).json(results.rows); // si el status es correcto, que devuelva las rows del select
    })
}

const verificarMail  = (req, res) => {
    console.log("Mail del usuario desde req:");
    console.log(req);
    pool.query("SELECT * FROM prueba.usuarios WHERE mail_usuario = $1", [req],(error, results)=>{
        if(error){
            console.error("Error en la consulta", error);
            return res.status(500).json({error: "Error en la consulta"});
        }
        console.log("Resultado de verificarMail: ");
        console.log(results.rows);
        res = results;
    } )
    return res;
}

const  verificarMailContrasena = (req,res)=>{
    pool.query("SELECT * FROM prueba.usuarios WHERE mail_usuario = $1 AND contraseña_usuario = $2", [emial,password], (error,results)=>{
        if(error){
            console.error("Error en la consulta", error);
            return res.status(500).json({error:"Error en la consulta"});
        }
        res.status(200).json(results.rows);
    })
}

module.exports={getUsers,verificarMail, verificarMailContrasena};