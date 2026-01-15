/**
 * el Modelo es el formulario que dice qué datos son obligatorios 
 * para que un objeto pueda entrar en la bbdd.
 * Sin este archivo, podrías guardar cualquier cosa (números donde van nombres, o tareas sin título)
 */

const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, //en el word
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema); // Task (mayúsculas) es el objeto capaz de hablar con la bbdd
module.exports = Task;
