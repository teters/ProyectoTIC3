const express = require('express');
const usuariosRoutes = require('./scr/usuarios/routes');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 300;
const controller = require('./scr/usuarios/controllersIniciarSecion')
const controllerRegistro = require('./scr/usuarios/controllersRegistro')
// Importa el controlador de tareas
const taskController = require('./controllers/taskController');

app.use(express.json()); // para que se puedan hacer puts y gets de jsons
app.use('/api/usuarios', usuariosRoutes); //


app.get("/api", (req,res) =>{
  res.json({"users": ["usuario1", "usuario2", "usuario3"]})
})
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let resultadoInicioSecion = controller.inicioDeSecion(email,password);
  if(resultadoInicioSecion === "el mail no esta registrado"){
    return res.status(400).json({message: "El mail no esta registrado"});
  }
  else if(resultadoInicioSecion === "contraseña incorrecta"){
    return res.status(400).json({message: "La contraseña es incorrecta"});
  }
  else if(resultadoInicioSecion === "todo bien"){
    return res.status(200).json({message: "Todo bien"})
  }
});


app.post("/signup", async (req, res) => {
  const {email, usuario, cedula, fechaNacimiento, password } = req.body;
  
  const resultadoRegistro = await controllerRegistro.registrarUsuarios(email, usuario, cedula, fechaNacimiento, password);
  

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
