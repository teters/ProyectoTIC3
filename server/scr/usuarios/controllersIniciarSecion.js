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
//debe faltar algun awair
const verificarMail = async (req) => {
    console.log("entro a verificar mail");
    const resultado = await new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM usuarios WHERE mail_usuario = $1", [req], (error, results) => {
            if (error) {
                console.error("Error en la consulta", error);
                reject("Error en la consulta");
            } else {
                console.log("Resultado de verificarMail: ", results.rows);
                resolve(results.rows);
            }
        }); 
    });

    return resultado;
};

const verificarMailContrasena = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM usuarios WHERE mail_usuario = $1 AND contraseña_usuario = $2", [email, password], (error, results) => {
            if (error) {
                console.error("Error en la consulta", error);
                reject("Error en la consulta");
            } else {
                console.log("Resultado de verificarMailContrasena: ", results.rows);
                var resultado = results.rows;
                resolve(resultado);
            }
        });
    });
};


const inicioDeSecion = async (email, password) => {
    try {
        const existeMail = await verificarMail(email);
        console.log("Resultado de verificarMail: ", existeMail);

        if (existeMail.length === 0) {
            console.log("No tienes mail");
            return "el mail no esta registrado";
        } else {
            console.log("Existe la cuenta, ahora hay que verificar la contrasena");

            const existeCuenta = await verificarMailContrasena(email, password);

            if (existeCuenta.length === 0) {
                console.log("La contraseña es incorrecta");
                return "contraseña incorrecta";
            } else {
                console.log("La contraseña es correcta");
                return "todo bien";
            }
        }
    } catch (error) {
        console.error("Error:", error);
        // Manejar el error si ocurre
        throw error; // Puedes lanzar el error nuevamente o manejarlo aquí según sea necesario
    }
};
        

module.exports={getUsers, verificarMail, verificarMailContrasena, inicioDeSecion};