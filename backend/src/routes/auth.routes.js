const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();

// Usamos la clave del .env o una por defecto si falla
const SECRET_KEY = process.env.CLAVE || "clave_emergencia";

router.post("/login", async (req, res) => {
  console.log("--- INTENTO DE LOGIN ---");

  try {
    // 1. Limpiamos los datos de entrada (quitar espacios accidentales)
    const usernameInput = req.body.username ? req.body.username.trim() : null;
    const passwordInput = req.body.password;

    console.log(`Buscando al usuario: '${usernameInput}'`);

    // 2. Buscar usuario en la BD
    const user = await User.findOne({ username: usernameInput });

    if (!user) {
      console.log("Resultado: El usuario no existe en la base de datos.");
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    console.log("Usuario encontrado en BD. Verificando contraseña...");

    // 3. Comparar contraseñas
    // Intentamos comparar con Bcrypt (si es un hash)
    const isMatch = await bcrypt.compare(passwordInput, user.password);

    // Opcional: Comparación en texto plano (por si escribiste '123456' directo en Compass)
    const isPlainMatch = passwordInput === user.password;

    if (isMatch || isPlainMatch) {
      console.log("¡LOGIN CORRECTO!");

      // 4. Generar Token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.json({
        token,
        user: { id: user._id, username: user.username },
      });
    } else {
      console.log("Resultado: La contraseña NO coincide.");
      console.log("- Enviada:", passwordInput);
      console.log("- En BD:", user.password);
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("ERROR EN EL SERVIDOR:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
