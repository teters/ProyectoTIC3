const express = require('express');
const app = express();
const port = process.env.PORT || 300;

// Importa el controlador de tareas
const taskController = require('./controllers/taskController');

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
