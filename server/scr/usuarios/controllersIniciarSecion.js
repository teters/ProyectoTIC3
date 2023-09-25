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

const verificarMail = (req) => {
    console.log("entro a verificar mail");
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM prueba.usuarios WHERE mail_usuario = $1", [req], (error, results) => {
            if (error) {
                console.error("Error en la consulta", error);
                reject("Error en la consulta");
            } else {
                console.log("Resultado de verificarMail: ", results.rows);
                var resultado = results.rows;
                resolve(resultado);
            }
        });
    });
};

const verificarMailContrasena = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM prueba.usuarios WHERE mail_usuario = $1 AND contraseña_usuario = $2", [email, password], (error, results) => {
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

const inicioDeSecion = (email, password) => {
    var existeMail = verificarMail(email);

    existeMail
        .then((resultado) => {
            console.log("Resultado de verificarMail: ", resultado);
            if (resultado.length === 0) {
                // no hay un mail asociado a esa cuenta
                // funcion para decirle al front que ponga un cartel de que se cree una cuenta nueva
                console.log("No tienes mail");
            } else {
                // Aquí puedes hacer algo con el resultado
                // hay un mail asociado a la cuenta, ahora corroborar que este bien la contrasena
                console.log("Existe la cuenta, ahora hay que verificar la contrasena")

                var existeCuenta = verificarMailContrasena(email, password);

                existeCuenta
                    .then((resultadoContrasena) => {
                        if (resultadoContrasena.length === 0) {
                            // la contraseña es incorrecta
                            console.log("La contraseña es incorrecta");
                        } else {
                            // la contraseña es correcta, puedes continuar con la lógica
                            console.log("La contraseña es correcta");
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        // Manejar el error si ocurre
                    });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            // Manejar el error si ocurre
        });

}

module.exports={getUsers,verificarMail, verificarMailContrasena, inicioDeSecion};