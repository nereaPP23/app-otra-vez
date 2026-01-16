require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express(); //crear instancia del servidor
const PORT = process.env.PORT || 5000; //definir el puerto

app.use(cors()); //aplicar el permiso de seguridad cors
app.use(express.json()); // Permite recibir JSON en las solicitudes


//conectar a la base de datos
connectDB();

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

//importar ruta de tareas
const tasksRoutes = require("./routes/tasks.routes"); //el ./ se refiere a buscar en esta misma carpeta 
app.use("/api/tasks", tasksRoutes);


//ruta (endpoint) de la aplicación
app.get("/", (req, res) => { //req = peticion, res = respuesta
  res.send("¡Servidor funcionando perfectamente!"); //enviar respuesta
});

app.listen(PORT, () => { //encender el servidor
  console.log(`Servidor corriendo en
http://localhost:${PORT}`);
});
