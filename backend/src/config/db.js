const mongoose = require("mongoose");
const connectDB = async () => { //async y await explicados en el word
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, //utilizamos el archivo .env para que nadie tenga la contraseña de la db
   /*  {
        useNewUrlParser: true, //esto son ajustes de fabrica de mongoose (no hacen falta para versiones mas nuevas)
        useUnifiedTopology: true,
    } */);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Detiene la ejecución si falla la conexión
  }
};
module.exports = connectDB;
