const pool = require('../../db');
const bcrypt = require('bcrypt');

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

const verificarMail = async (email) => {
    //console.log("entro a verificar mail");
   // const resultado = await new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM usuarios WHERE mail_usuario = $1", [email], (error, results) => {
            console.log(error);
            if (error) {
                console.error("Error en la consulta", error);
                reject("Error en la consulta");
            } else {
                //console.log("Resultado de verificarMail en vM: ", results.rows);
                resolve(results.rows);
            }
        }); 
    });

    //return resultado;
};

/*const verificarMailContrasena = (email, password) => {
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
};*/

const verificarMailContrasena = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM usuarios WHERE mail_usuario = $1", [email], async (error, results) => {
            if (error) {
                console.error("Error en la consulta", error);
                reject("Error en la consulta");
            } else {
                if (results.rows.length === 0) {
                    resolve([]); // No se encontró el correo electrónico en la base de datos
                    return;
                }

                const usuario = results.rows[0];
                const hashedPassword = usuario.contraseña_usuario; // Obtén la contraseña encriptada de la base de datos

                // Compara la contraseña proporcionada por el usuario con la contraseña encriptada almacenada en la base de datos
                try {
                    const contrasenaCorrecta = await bcrypt.compare(password, hashedPassword);

                    if (contrasenaCorrecta) {
                        resolve([usuario]); // La contraseña es correcta, devuelve el usuario
                    } else {
                        resolve([]); // La contraseña es incorrecta, no se encontró el usuario
                    }
                } catch (err) {
                    console.error("Error al comparar contraseñas", err);
                    reject("Error al comparar contraseñas");
                }
            }
        });
    });
};


const inicioDeSecion = async (email, password) => {
    try {
        
        const existeMail = await verificarMail(email);
        //console.log("Resultado de verificarMail: ", existeMail.rowsCount);

        if (existeMail.length === 0) {
            console.log("No tienes mail");
            return "el mail no esta registrado";
        } else {
            //console.log("Existe la cuenta, ahora hay que verificar la contrasena");

            const existeCuenta = await verificarMailContrasena(email, password);
            //console.log(existeCuenta.length);
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

const buscarDatos = async(email) => {
    
    const query = {
        text: 'SELECT nombre_usuario, dinero_disponible, fecha_nacimiento FROM usuarios WHERE mail_usuario = $1',
        values: [email],
      };
    
      
    const result = await pool.query(query);
    
    console.log("el resuelt rows es", result.rows[0]);
    if (result.rows.length === 1) {
       // console.log("Las rows son", result.rows[0]);
        const { nombre_usuario, dinero_disponible, fecha_nacimiento} = result.rows[0];
        
        const fechaCompleta = fecha_nacimiento.toISOString();
        //console.log(fechaCompleta);
        const fecha = fechaCompleta.slice(0, 10);
        console.log("la fecha es", fecha);
        return { nombre: nombre_usuario, saldo: dinero_disponible, fechaNac: fecha  };
      } else {
        // El correo electrónico no se encontró en la base de datos
        return { error: 'Correo electrónico no encontrado' };
      }


};
        

module.exports={getUsers, verificarMail, verificarMailContrasena, inicioDeSecion, buscarDatos};
