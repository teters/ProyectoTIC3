const express = require('express');
const usuariosRoutes = require('./scr/usuarios/routes');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 300;
const controller = require('./scr/usuarios/controllers')

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

  // Aquí puedes realizar la autenticación del usuario y responder en consecuencia
  // Por ejemplo, verificar las credenciales y devolver un token de acceso si son válidas.

  const resultado = controller.verificarMail(email);
  console.log("Valor resultado:")
  console.log(resultado);
  if(resultado.length === 0 ){
    console.log("No tenes mail")
  }



  if (email === "ejemplo2@email.com" && password === "contrasena123") {
    res.status(200).json({ message: "Inicio de sesión exitoso" });
    console.log("anduvo")
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
    console.log("no anduvo")
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
