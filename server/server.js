const express = require('express');
const usuariosRoutes = require('./scr/usuarios/routes');
const app = express();
const multer = require('multer');
const bodyParser = require("body-parser");
const port = process.env.PORT || 300;
const controller = require('./scr/usuarios/controllersIniciarSecion')
const controllerRegistro = require('./scr/usuarios/controllersRegistro')
const controllerInicio = require('./scr/usuarios/controllerPaginaInicio')
// Importa el controlador de tareas
const taskController = require('./controllers/taskController');

const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán las imágenes


app.use(express.json()); // para que se puedan hacer puts y gets de jsons
app.use('/api/usuarios', usuariosRoutes); //


app.get("/api", (req,res) =>{
  res.json({"users": ["usuario1", "usuario2", "usuario3"]})
})
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  let resultadoInicioSecion = await controller.inicioDeSecion(email, password);


  if(resultadoInicioSecion === "el mail no esta registrado"){
    return res.status(400).json({message: "El mail no esta registrado"});
  }
  else if(resultadoInicioSecion === "contraseña incorrecta"){
    return res.status(400).json({message: "La contraseña es incorrecta"});
  }
  else if(resultadoInicioSecion === "todo bien"){
    //console.log("entro al ultimo elseif");
    return res.status(200).json({message: "todo bien"}) 
  }
});

/*app.post("/login/datos", async (req, res) => {
  //console.log("entro al post");
  const { email } = req.body;
  const datos = await controller.buscarDatos(email);
  //console.log("volvio del buscar datos");
  console.log(datos);
  return datos;
});*/

app.get("/login/datos", async (req, res) => {
  const email = req.query.email; // Obtiene el correo electrónico desde los parámetros de consulta

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico no proporcionado" });
  }

  try {
    const datos = await controller.buscarDatos(email);
    console.log(datos.nombre);
    console.log(datos.saldo);
    res.json(datos);
  } catch (error) {
    console.error("Error al buscar datos:", error);
    res.status(500).json({ error: "Error al buscar datos" });
  }
});

/* app.post("/incio", async (req, res) => {
  console.log("entro al post de inicio");
  const email= req.body;
  console.log(email);

  controllerInicio.busquedaDatosU(email);

});*/
app.post("/inicio/arranca", async(req, res) => {
  console.log("entro al inicio/arranca", req.body);
  email = req.body.email;

  const datosPartida = await controllerInicio.arrancaPartida(email);
  console.log(datosPartida);
  console.log("Los datos de la aprtida son", datosPartida);
  console.log(datosPartida.email);
  return res.status(200).json({email: datosPartida.email, id: datosPartida.id, multiplier: datosPartida.multiplier, saldoActual: datosPartida.saldoActual});
});

app.post("/inicio/saldo", async(req, res) => {
  //console.log("entro al inicio/saldo");
  //console.log(req.body);
  

  const nuevoSaldo = await controllerInicio.modificarSaldo(req.body.email, req.body.ganancia);
  console.log(nuevoSaldo);
  console.log("el nuevosaldo es:", nuevoSaldo.saldoNuevo);
  return res.status(200).json({saldoNuevo: nuevoSaldo.saldoNuevo});
});

app.post("/inicio/jugada", async(req, res) => {
  console.log("entro el inicio/jugada");
  email = req.body.email;
  idJugada= req.body.idPartido;
  apostado = req.body.apostado;
  mutliplicador = req.body.outMultiplier;
  dineroGanado = req.body.dineroRetirado;
  
  console.log("la id de la jugada es", idJugada);

  const nuevaJugada = await controllerInicio.cargarJugadaUsuario(email, idJugada, apostado, mutliplicador, dineroGanado );
  console.log(nuevaJugada);
});


app.post("/signup", upload.single("fotoCedula"), async (req, res) => {
  //const {email, usuario, cedula, fechaNacimiento, password} = req.body;
  //const fotoCedula1 = req.body.file;
  const email = req.body.email;
  const usuario = req.body.usuario;
  const cedula = req.body.cedula;
  const fechaNacimiento = req.body.fechaNacimiento;
  const password = req.body.password;
  console.log(req.file);
  //console.log(req.file.fotoCedula);
  const fotoCedula = req.file;
  //console.log(req);
  
  const resultadoRegistro = await controllerRegistro.registrarUsuarios(email, usuario, cedula, fechaNacimiento, password, fotoCedula);
  

  if (resultadoRegistro === "Registro existoso" ){
    console.log("resultadoRegistro:", resultadoRegistro);
    return res.status(200).json({message: "Registro existoso"});
  }

  else if(resultadoRegistro === "Todos los campos son obligatorios"){
    return  res.status(400).json({message: "Todos los campos son obligatorios"});
  }

  else if(resultadoRegistro === "El correo electrónico ya está registrado."){
    return res.status(400).json({message:"El correo electrónico ya está registrado."});
  }

  else if(resultadoRegistro === "Esa cédula ya fue registrada"){
    return res.status(400).json({message:"Esa cédula ya fue registrada"});
  }

  else if ( resultadoRegistro === "La cédula debe contener exactamente 8 dígitos."){
    return res.status(400).json({message:"La cédula debe contener exactamente 8 dígitos."});
  }
  
  else if(resultadoRegistro === "La contraseña debe tener al menos 8 caracteres."){
    return res.status(400).json({message:"La contraseña debe tener al menos 8 caracteres."});
  }

  else if(resultadoRegistro === "La contraseña debe contener al menos un número."){
    return res.status(400).json({message:"La contraseña debe contener al menos un número."});
  }

  else if(resultadoRegistro === "La contraseña debe contener al menos una letra mayúscula."){
    return res.status(400).json({message:"La contraseña debe contener al menos una letra mayúscula."});
  }


  else if (resultadoRegistro === "Debes tener al menos 18 años para registrarte."){
    //console.log("resultadoRegistro dentro de if:", resultadoRegistro);
    return res.status(400).json({message: "Debes tener al menos 18 años para registrarte."});
  }
  
  
});




// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());

// Ruta para obtener todas las tareas
app.get('/api/tasks', taskController.getAllTasks);

// Ruta para crear una nueva tarea
app.post('/api/tasks', taskController.createTask);

// Ruta para obtener una tarea por su ID
app.get('/api/tasks/:id', taskController.getTaskById);

// Ruta para actualizar una tarea por su ID
app.put('/api/tasks/:id', taskController.updateTask);

// Ruta para eliminar una tarea por su ID
app.delete('/api/tasks/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
