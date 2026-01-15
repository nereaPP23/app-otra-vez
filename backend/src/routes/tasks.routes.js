//Este script es el conocido como CRUD (Create, Read, Update, Delete)

const express = require("express");
const router = express.Router(); //router es como un pasillo especifico dentro del servidor (detallado en word)
const Task = require("../models/task"); 

// Lista de tareas (por ahora simuladas en memoria)
let tasks = [
  { id: 1, title: "Aprender Node.js", completed: false },
  { id: 2, title: "Configurar Express", completed: true },
];

//OPERACIONES (VERBOS HTTP)

// Obtener todas las tareas
router.get("/tasks", (req, res) => { //ponemos /tasks para que el servidor sepa que informacion devolver
  res.json(tasks);
});

// Agregar una nueva tarea
router.post("/tasks", (req, res) => {
  const { title } = req.body; //req.body es lo que se recibe desde el frontend 
  if (!title)
    return res.status(400).json({ error: "El título es obligatorio" }); //si no hay titulo da error
  const newTask = { id: tasks.length + 1, title, completed: false }; //crear nuevo objeto
  tasks.push(newTask); //agregar el nuevo objeto a la lista
  res.json(newTask); //devolver el nuevo objeto
});

// Marcar una tarea como completada
router.put("/tasks/:id", (req, res) => { //se pon id para que el servidor sepa a que tarea se refiere
  const { id } = req.params; //estás sacando el número que viene en la URL
  const task = tasks.find((t) => t.id == id); //buscar en la lista de tareas
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" }); //si no encuentra, da error
  task.completed = !task.completed; // Si estaba "false", la pasa a "true" y viceversa
  res.json(task);
});

// Eliminar una tarea
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id); // Crea una lista nueva donde NO esté ese ID
  res.json({ message: "Tarea eliminada" });
});

module.exports = router; //exportar el router para que el servidor lo use
