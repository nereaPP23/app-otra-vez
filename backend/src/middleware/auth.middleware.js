const jwt = require("jsonwebtoken");

// DEBE SER LA MISMA QUE EN AUTH.ROUTES.JS
const SECRET_KEY = process.env.CLAVE || "clave_emergencia";

module.exports = (req, res, next) => {
  // 1. Obtenemos la cabecera completa
  const authHeader = req.headers.authorization;

  // 2. Si no existe, fuera
  if (!authHeader) {
    console.log("Middleware: No llegó la cabecera Authorization");
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    // 3. SEPARAMOS Y COGEMOS SOLO EL TOKEN (Posición 1)
    // authHeader es "Bearer eyJhbG..." -> split lo deja como ["Bearer", "eyJhbG..."]
    const token = authHeader.split(" ")[1];

    // 4. Verificamos pasándole el TEXTO del token
    const decoded = jwt.verify(token, SECRET_KEY);

    // 5. Guardamos el ID para usarlo en los controladores
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Middleware Error:", error.message);
    res.status(401).json({ error: "Token inválido" });
  }
};
