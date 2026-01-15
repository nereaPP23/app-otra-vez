//Este script es el conocido como CRUD (Create, Read, Update, Delete)

const express = require("express");
const router = express.Router(); //router es como un pasillo especifico dentro del servidor (detallado en word)
const Task = require("../models/task");
const authMiddleware = require("../middleware/auth.middleware");

// Obtener todas las tareas
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Agregar una nueva tarea
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, completed: false, userId: req.userId });
  await task.save();
  res.status(201).json(task);
});
// Marcar una tarea como completada
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});
// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});
module.exports = router;
