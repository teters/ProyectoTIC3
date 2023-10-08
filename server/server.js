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

  controller.inicioDeSecion(email,password);
});


app.post("/signup", async (req, res) => {
  const {email, usuario, cedula, fechaNacimiento, password } = req.body;
  
  let resultadoRegistro = controllerRegistro.registrarUsuarios(email, usuario, cedula, fechaNacimiento, password);
  
  console.log("resultadoRegistro dentro de if:", resultadoRegistro);
  if (resultadoRegistro === "Registro existoso" ){
    //console.log("resultadoRegistro dentro de if:", resultadoRegistro);
    return res.status(200).json({message: "Registro existoso"});
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
